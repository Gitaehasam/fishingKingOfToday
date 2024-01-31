import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component, useEffect } from 'react';
import ChatComponent from './chat/ChatComponent';
import StreamComponent from './stream/StreamComponent';
import './VideoRoomComponent.css';

import OpenViduLayout from './layout/openvidu-layout';
import UserModel from './models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';

var localUser = new UserModel();

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    // ROOM_ID = this.props.sessionInfo.roomId;
    this.accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
      ? this.props.openviduServerUrl
      : "https://i10c203.p.ssafy.io";
    //   : "https://openvidu/api/sessions";
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "wearegitaehasam";
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA';                             // 세션 이름 설정가능
    let userName = this.props.user ? this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);       // userName 설정가능
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      // id: ROOM_ID,
      mySessionId: sessionName,       // session 구분 용 간단한 id
      myUserName: userName,           // session 참여자로서 보여지는 이름
      session: undefined,
      localUser: undefined,
      subscribers: [],                // 시청자 목록
      chatDisplay: true,            // 채팅창 보여주는 여부
      currentVideoDevice: undefined,
      user: undefined,
      sessionInfo: undefined,
    };

    this.joinSession = this.joinSession.bind(this);             // 방 입장
    this.leaveSession = this.leaveSession.bind(this);           // 방 퇴장
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);   // 카메라 상태(on/off)
    this.micStatusChanged = this.micStatusChanged.bind(this);   // 마이크 상태(on/off)
    this.switchCamera = this.switchCamera.bind(this);           // 카메라 전환
    this.toggleChat = this.toggleChat.bind(this);               // 채팅 on/off
  
  }

    // 마운트 직후 렌더링
  componentDidMount() {
    // 레이아웃 옵션들
    const openViduLayoutOptions = {
      maxRatio: 16 / 9,        // 가장 좁은 가로 세로 비율 (default 2:3)
      minRatio: 16 / 9,       // 가장 넓은 가로 세로 비율 (default 16:9)
      fixedRatio: false,      // true이면 비디오의 가로 세로 비율이 유지되고, minRatio와 maxRatio는 무시 (default false)
      bigClass: 'OV_big',     // 크게 표시되어야 할 요소에 추가할 클래스를 설정
      // bigPercentage: 0.8,     // 큰 요소가 차지할 공간의 최대 비율을 설정
      bigFixedRatio: true,   // 큰 요소에 대한 fixedRatio를 설정
      bigMaxRatio: 16 / 9,     // 큰 요소에 사용될 가장 좁은 가로 세로 비율을 설정 (default 2:3)
      bigMinRatio: 16 / 9,    // 큰 요소에 사용될 가장 넓은 가로 세로 비율을 설정 (default 16x9)
      bigFirst: true,         // 큰 요소를 왼쪽 상단에 배치할지 (true), 아니면 오른쪽 하단에 배치할지 (false)를 설정
      animate: true,          // 전환 효과에 애니메이션을 적용할지를 설정
    };

    this.setState({
      user: this.props.user,
      sessionInfo: this.props.sessionInfo,
    })

    // 레이아웃을 초기화
    this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);

    // 페이지 언로드 이벤트와 창 크기 변경 이벤트에 이벤트 핸들러를 등록
    window.addEventListener('beforeunload', this.onbeforeunload);   // 사용자가 현재 페이지를 떠날 때 추가 확인을 요청
    window.addEventListener('resize', this.updateLayout);           // 브라우저 창의 크기가 변경될 때 발생
    window.addEventListener('resize', this.checkSize);              // 메서드가 창 크기 변경 시에 실행

    // 세션 입장
    this.joinSession();
  }

    // 언마운트 시에 실행할 내용
  componentWillUnmount() {
    // 페이지 언로드 이벤트와 창 크기 변경 이벤트에 이벤트 핸들러를 제거
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('resize', this.updateLayout);
    window.removeEventListener('resize', this.checkSize);

    // 세션 퇴장
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

    // 세션 입장하기
  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        await this.connectToSession();          // 세션에 연결하는 과정을 시작
      },
    );
  }

  // 세션에 연결
  connectToSession() {
    if (this.props.token !== undefined) {
      this.connect(this.props.token);
    } else {
      this.getToken()
        .then((token) => {
          this.connect(token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

    // 연결 시작 + 웹켐 연결
  connect(token) {
    this.state.session
      .connect(
        token,
        { clientData: this.state.myUserName },      // 토큰과 사용자 이름을 사용하여 세션에 연결
      )
      .then(() => {
        this.connectWebCam();                       // 웹캠에 연결하는 과정을 시작
      })
      .catch((error) => {
        if(this.props.error){
          this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
        }
        alert('There was an error connecting to the session:', error.message);
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  }

  async connectWebCam() {
    await this.OV.getUserMedia({ audioSource: undefined, videoSource: undefined });     // 사용자의 오디오와 비디오 미디어 정보 가져오기
    var devices = await this.OV.getDevices();                                           // 사용 가능한 미디어 장치 정보 가져오기
    var videoDevices = devices.filter(device => device.kind === 'videoinput');          // 사용 가능한 미디어 장치 중 비디오 입력 장치를 필터링

    // 비디오 스트림을 게시할 퍼블리셔를 초기화
    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,                     // 오디오 소스
      videoSource: videoDevices[0].deviceId,      // 비디오 소스
      publishAudio: localUser.isAudioActive(),    // 오디오 게시 여부
      publishVideo: localUser.isVideoActive(),    // 비디오 게시 여부
      resolution: '852x393',                      // 해상도
      frameRate: 30,                              // 프레임 레이트
      insertMode: 'APPEND',                       // 삽입 모드
    });

    this.setState({ vdSource: "webcam" });

    // 사용자가 미디어 접근을 허용했을 때 실행되며, 퍼블리셔를 세션에 게시하고, 구독자를 업데이트
    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed' , () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });

    }
    localUser.setNickname(this.state.myUserName);                               // 로컬 사용자의 닉네임을 설정
    localUser.setConnectionId(this.state.session.connection.connectionId);      // 로컬 사용자의 연결 ID를 설정
    localUser.setScreenShareActive(false);                                      // 로컬 사용자의 화면 공유 활성화 상태를 설정
    localUser.setStreamManager(publisher);                                      // 로컬 사용자의 스트림 관리자를 설정

    this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });   // userChanged()

    // 비디오 장치와 로컬 사용자를 상태에 설정
    // 'streamPlaying' 이벤트에 대한 리스너를 등록하여 스트림이 재생되면 레이아웃을 업데이트
    this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
      this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
        this.updateLayout();
        publisher.videos[0].video.parentElement.classList.remove('custom-class');
      });
    });
  }

  // 시청자 목록 가져오기
  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          // 현재 로컬 사용자의 상태
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),                // 오디오 활성화 여부
            isVideoActive: this.state.localUser.isVideoActive(),                // 비디오 활성화 여부
            nickname: this.state.localUser.getNickname(),                       // 닉네임
            isScreenShareActive: this.state.localUser.isScreenShareActive(),    // 화면 공유 활성화 여부
          });
        }
        this.updateLayout();        // 레이아웃을 업데이트
      },
    );
  }

    // 세션 퇴장
  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // 모든 상태를 초기화
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
    // this.props.navigate("/media/roomList", { replace: true });
  }

    // 카메라 on/off
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  // 마이크 on/off
  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  async switchCamera() {
    try{
      const devices = await this.OV.getDevices()
      var videoDevices = devices.filter(device => device.kind === 'videoinput');

      if(videoDevices && videoDevices.length > 1) {

        var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.localUser.getStreamManager());
          await this.state.session.publish(newPublisher)
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
  } catch (e) {
      console.error(e);
    }
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
        console.log('chat', display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className="container" id="container">
        <ToolbarComponent
          sessionId={mySessionId}
          user={localUser}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          switchCamera={this.switchCamera}
          leaveSession={this.leaveSession}
          toggleChat={this.toggleChat}
        />

        <div id="layout" className="bounds">
          {localUser !== undefined && localUser.getStreamManager() !== undefined ? (
            <div className="OT_root OT_publisher custom-class" id="localUser">
              <StreamComponent user={localUser} handleNickname={this.nicknameChanged} />
              <ChatComponent
                user={localUser}
                chatDisplay={this.state.chatDisplay}
                close={this.toggleChat}
              />
            </div>
          )
          :
          <div>
            <span>라이브가 종료되었습니다.</span>
            <button>나가기</button>
          </div>}
        </div>
      </div>
    );
  }


  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId),
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      
    axios.post(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", {data}, {
      headers: {
        Authorization: "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
        "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res)
        resolve(res.data.id);
      })
      .catch((res) => {
        console.log(res)
      });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}
export default VideoRoomComponent;
