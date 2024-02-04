import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserModel from "./models/user-model";
import OpenViduLayout from "../openVidu/layout/openvidu-layout";
import UserVideoComponent from "./UserVideoComponent";
import ToolbarComponent from '../openVidu/toolbar/ToolbarComponent';
import ChattingList from "../openVidu/chat/ChattingList"
import ChattingForm from "../openVidu/chat/ChattingForm"
import useWindowSize from "../../../components/room/liveSize";
import LeaveModal from "../../../components/room/LeaveModal";

import "./VideoRoomComponent.css";


var localUser = new UserModel();

const OPENVIDU_SERVER_URL = "https://i10c203.p.ssafy.io"
const OPENVIDU_SERVER_SECRET = "wearegitaehasam"

const VideoRoomComponent = (props) => {
  const navigate = useNavigate(); // 네비게이터'
  const location = useLocation(); // 로케이션(이전 페이지에서 데이터를 받아옴)
  const size = useWindowSize();

  const [mySessionId, setMySessionId] = useState('SessionA'+ Math.floor(Math.random() * 100));
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
  const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
  const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
  const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
  const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
  const [chatDisplay, setChatDisplay] = useState(true); // 채팅창 보이기(초깃값: true) 
  const [profileImg, setProfileImg] = useState(null);
  const [isCamera, setIsCamera] = useState(true)
  const [isAudio, setIsAudio] = useState(true)
  const [leaveModal, setLeaveModal] = useState(false)
  const [hostNickname, setHostNickname] = useState('');
  const [hostProfileImg, setHostProfileImg] = useState('');

  const roomId = (location.state !== null) ? location.state.id : null;
  const isHost = (location.state.role) ? true : false;

  let OV = undefined;

  // 토큰 받아오기(KMS로 직접 쏨)
  const getToken = useCallback(() => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  }, [mySessionId]);

  // 세션 생성(KMS로 직접 쏨)
  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          console.log(isHost)
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
          }
        });
    });
  }

  // 토큰 생성(KMS로 직접 쏨)
  const createToken = (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    
    return new Promise((resolve, reject) => {
      const data = { role: myRole }; // 여기에 인자를 뭐를 넣냐에 따라 오픈비두 서버에 요청하는 데이터가 달라짐
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
  
  let layout;

  useEffect(() => {
      setMySessionId(`Session${roomId}`);
  
      layout = new OpenViduLayout();
      const openViduLayoutOptions = {
        maxRatio: 1,
        minRatio: 1,
        fixedRatio: true,
        bigClass: 'OV_big',
        bigPercentage: 1,
        bigFixedRatio: false,
        bigMaxRatio: 1,
        bigMinRatio: 1,
        bigFirst: true,
        animate: true,
      };
  
      layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
      layout.setLayoutOptions(openViduLayoutOptions);
  
      window.addEventListener('beforeunload', onbeforeunload);
      joinSession();
  }, []);

  const joinSession = async () => {
    OV = new OpenVidu(); 

    let mySession = OV.initSession();
    setSession(mySession);
    try {
      const token = await getToken(); 
    } catch(error) {
      console.log(error);
    }

    const publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: isAudio,
      publishVideo: isCamera,
      resolution: `${size.width}x${size.height}`,
      frameRate: 30,
      insertMode: 'APPEND',
      mirror: false
    });

    mySession.connect(token, { clientData: myUserName })
      .then(() => {
        mySession.publish(publisher)
          .then(() => {
            localUser.setNickname(myUserName);
            localUser.setConnectionId(mySession.connection.connectionId);
            localUser.setStreamManager(publisher);
          })
        setPublisher(publisher) // 퍼블리셔(스트림 객체)를 담음
        setMainStreamManager(publisher) // 퍼블리셔(스트림 객체)를 담음
      });

    mySession.on('streamCreated', (event) => { // 스트림이 생길 때마다
      const subscriber = mySession.subscribe(event.stream, 'publisher'); // 퍼블리셔를 구독자로 넣어줌
      setSubscribers(subscriber)
    });

    mySession.on('streamDestroyed', (event) => { // 스트림을 종료할 때마다
      deleteSubscriber(event.stream.streamManager); // 참가자 배열에서 스트림 객체를 제거함
    });

    mySession.on('exception', (exception) => { // 예외 처리
      console.warn(exception);
    });

    mySession.on('connectionCreated', (({ stream }) => { // 유저가 접속할 때마다 인원수를 += 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1
      })
    }));

    mySession.on('connectionDestroyed', (({ stream }) => { // 유저가 접속을 끊을 때마다 -= 1
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1
      })
    }));

    mySession.on("signal:chat", (event) => { // 채팅 신호 수신하여 메세지 리스트 업데이트
      setMessageList((prevMessageList) => { 
        return [...prevMessageList, event.data]
      })
    });

    axios.get(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + mySessionId, {
      headers: {
        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const selectedRoom = response.data.publisher;
      
      if (selectedRoom) {
        setHostNickname(selectedRoom.nickname);
        setHostProfileImg(selectedRoom.thumbnail);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const camStatusChanged = () => {
    publisher.publishVideo(!publisher.stream.videoActive);
    setIsCamera(!isCamera)
    setPublisher(publisher);
  }

  const micStatusChanged = () => {
    publisher.publishAudio(!publisher.stream.audioActive);
    setIsAudio(!isAudio)
    setPublisher(publisher);
  }

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
  
      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.find(device => device.deviceId !== publisher.stream.videoSource.deviceId);
        if (newVideoDevice) {
          const newPublisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice.deviceId,
            publishAudio: publisher.stream.audioActive,
            publishVideo: publisher.stream.videoActive,
            mirror: true,
          });
  
          await session.unpublish(publisher);
          await session.publish(newPublisher);
  
          setPublisher(newPublisher);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 방 삭제 요청 api
  const deleteRoomRequest = async() => {
    if (isHost) {
      try {
        const response = await axios.delete(OPENVIDU_SERVER_URL + `/openvidu/api/sessions/${mySessionId}`, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET)
          }
        });

        if (response.status === 204) {
          console.log('Room Deleted Successfully!');
        } else {
          console.log('Room Deletion Failed!');
        }
      } catch (error) {
        console.log('Error Deleting Room: ', error);
      }
    }
  }

  // 세선 떠나기 --- 7) disconnect함수를 호출하여 세션을 떠남
  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
      navigate('/media/roomList') // 메인페이지로 이동
    }
    // 속성을 초기화함(필요한 속성은 초기화하면 안 됨)
    OV = null;
    setSession(undefined)
    setSubscribers([])
    setMySessionId('SessionA')
    setMyUserName('Participant' + Math.floor(Math.random() * 100))
    setMainStreamManager(undefined)
    setPublisher(undefined)
    setMessageList([])
    setChatDisplay(true)
    setTotalUsers((prevTotalUsers) => { return 0 })
    deleteRoomRequest(); // 방 삭제를 요청함
  }

  // 호스트(방 생성자) 여부에 따른 isHost를 토글링함(created()) + 호스트가 아닐 경우 유저의 이름을 바꿈
  useEffect(() => {
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
  }, []);

  useEffect(() => {
    const onbeforeunload = (event) => {
      leaveSession();
    }
    window.addEventListener('beforeunload', onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  }, [leaveSession]);

  // 메세지 보내기(Sender of the message (after 'session.connect'))
  const sendMsg = (msg, currentSession) => {
    // this.state.session으로는 자식이 인식할 수 없으므로 currentSession을 자식에게 props로 넘겨주고 다시 받음
    currentSession
      .signal({
        data: msg, // .signal의 data는 문자열만 넘겨야한다
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "chat", // The type of message (optional)
      })
      .then(() => {
        console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const leaveLive = () => {
    setLeaveModal(true)
  }

  return (
    <>
      <div className="bounds">
        {session !== undefined && mainStreamManager !== undefined ? (
          <div>
          <ToolbarComponent
            sessionId={mySessionId}
            user={publisher}
            isHost={isHost}
            micStatusChanged={micStatusChanged}
            camStatusChanged={camStatusChanged}
            switchCamera={switchCamera}
            leaveSession={leaveSession}
            hostNickname={hostNickname}
            hostProfileImg={hostProfileImg}
          />
          
            {isHost && <UserVideoComponent streamManager={publisher}></UserVideoComponent>}
            {!isHost && <UserVideoComponent streamManager={subscribers}></UserVideoComponent>}
  
            {chatDisplay && 
              <div className="chatting">
                <ChattingList messageList={messageList}></ChattingList>
                <ChattingForm myUserName={myUserName} onMessage={sendMsg} currentSession={session}></ChattingForm>
              </div>
            }
          </div>
        ) : (
          <div>
            <span>라이브가 종료되었습니다.</span>
            <button onClick={() => navigate("/media/roomList")}>
              나가기
            </button>
          </div>
        )}
        
      {leaveModal ? 
        <LeaveModal state={setLeaveModal} leaveSession={leaveSession}/>
        : null  
      }

      </div>
    </>
  );
}

export default VideoRoomComponent;
