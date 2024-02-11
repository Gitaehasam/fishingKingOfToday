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
import LiveEndModal from "../../../components/room/LiveEndModal";
import SwitchCameraModal from "../../../components/room/SwitchCameraModal";
import Loading from "../../../components/Loading";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HeartButton from "./HeartBtn";

import "./VideoRoomComponent.css";


var localUser = new UserModel();

const baseURL = import.meta.env.VITE_BASE_URL
const OPENVIDU_SERVER_SECRET = "wearegitaehasam"

const VideoRoomComponent = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const size = useWindowSize();

  const roomId = location.state.roomId
  const isHost = location.state.isHost;
  const imageUrl = (location.state.imageUrl ? location.state.imageUrl : null)
  const name = (location.state.name ? location.state.name : null)
  const nickName = location.state.nickname
  const userImg = location.state.userImg
  const subscriberSession = (location.state.subscriberSession ? location.state.subscriberSession : null)

  const [apiRoomId, setApiRoomId] = useState(null)
  const [mySessionId, setMySessionId] = useState('Gitaehasam');
  const [myUserName, setMyUserName] = useState('');
  const [myUserImg, setMyUserImg] = useState('');
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [messageList, setMessageList] = useState([]);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [chatDisplay, setChatDisplay] = useState(true);
  const [profileImg, setProfileImg] = useState(null);
  const [isCamera, setIsCamera] = useState(true)
  const [isAudio, setIsAudio] = useState(true)
  const [leaveModal, setLeaveModal] = useState(false)
  const [hostNickname, setHostNickname] = useState('');
  const [hostProfileImg, setHostProfileImg] = useState('');
  const [liveEndModalOpen, setLiveEndModalOpen] = useState(false);
  const [favIcons, setFavIcons] = useState([]);

  const [isSwitchCameraModal, setIsSwitchCameraModal] = useState(false);
  const [isSessionCreated, setIsSessionCreated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  let OV = undefined;

  useEffect(() => {
    if (session && mainStreamManager) {
      setIsLoading(false);
    }
  }, [session, mainStreamManager]);

  const getToken = useCallback(() => {
    if (isHost) {
      return createSession(mySessionId)
      .then((sessionId) => createToken(sessionId));
    } else {
      return createToken(subscriberSession);
    }
  }, [mySessionId, isHost]);

  const createSession = (sessionId) => {
    if (isHost) {
    return new Promise((resolve, reject) => {
      console.log(roomId)
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(baseURL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);

          axios.post(baseURL + '/api/lives', {
            imageUrl:imageUrl,
            name:name,
            sessionId:response.data.sessionId,
          }, {
            headers: {
              Authorization: localStorage.getItem("jwt"),
              'Content-Type': 'application/json',
            }
          })
          .then((res2)=> {
            console.log("apiRoomId: ", res2.data.id);
            console.log(res2.data)
            setApiRoomId(res2.data.id)
            resolve(response.data.id);
          })
          .catch((error) => {
            console.log('Error on /lives request:', error);
          });
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
  } else {
    return Promise.resolve(subscriberSession);
  }
  }

  const createToken = (sessionId) => {
    let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
    
    return new Promise((resolve, reject) => {
      const data = { role: myRole, sessionId: sessionId };
      axios
        .post(baseURL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 404) {
            alert('종료된 라이브 입니다.');
            navigate('/media/roomList');
          } else {
            reject(error);
          }
        });
    });
  }
  

  let layout;

  useEffect(() => {
    setMySessionId(`Gitaehasam${roomId}`);
    setHostNickname(nickName)
    setHostProfileImg(userImg)
  }, [roomId]);
  
  useEffect(() => {
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
  
    if (mySessionId !== 'Gitaehasam') {
      joinSession();
    }
  }, [mySessionId]);
  
  const joinSession = async () => {
    OV = new OpenVidu(); 

    const devices = await OV.getDevices();
    const videoDevices = devices.filter((device) => device.kind === "videoinput");

    let mySession = OV.initSession();
    setSession(mySession);
    let token;
    try {
      token = await getToken(); 
    } catch(error) {
      console.log(error);
      return;
    }

    const publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: isAudio,
      publishVideo: isCamera,
      // resolution: `${size.width}x${size.height}`,
      resolution: `640x480`,
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
        setPublisher(publisher)
        setMainStreamManager(publisher)
      });

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, 'publisher');
      setSubscribers(subscriber)
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    mySession.on('connectionCreated', (({ stream }) => {
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers + 1
      })
    }));

    mySession.on('connectionDestroyed', (({ stream }) => {
      setTotalUsers((prevTotalUsers) => {
        return prevTotalUsers - 1
      })
    }));

    mySession.on("signal:heart", (event) => {
      const [, , icon] = event.data.split('|');
      setFavIcons((prev) => [...prev, { id: Date.now(), y: 100, icon: icon }]);
    });

    mySession.on("signal:chat", (event) => {
      setMessageList((prevMessageList) => { 
        return [...prevMessageList, event.data]
      })
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

  const switchCamera = async (newDeviceId) => {
    try {
      console.log(newDeviceId);
      const newPublisher = await OV.initPublisher(undefined, {
        audioSource: publisher.stream.audioSource,
        videoSource: newDeviceId,
        publishAudio: publisher.stream.hasAudio,
        publishVideo: publisher.stream.hasVideo,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });
  
      await session.unpublish(publisher);
      await session.publish(newPublisher);
      setPublisher(newPublisher);
      localUser.setStreamManager(newPublisher);
      setMainStreamManager(newPublisher);
    } catch (error) {
      console.error(error);
    }
  };  
  
  const leaveSession = async () => {
    const mySession = session;
    if (mySession) {
      if (isHost) {
        await deleteRoomRequest();
      }
      else {
        mySession.disconnect();
        navigate('/media/roomList', {replace:true})
      }
    }
  }
  
  const deleteRoomRequest = async () => {
    try {
      await axios.delete(baseURL + `/api/lives/${apiRoomId}`, 
      {
        headers: {
          Authorization: localStorage.getItem("jwt"),
          'Content-Type': 'application/json',
        }
      })
      await axios.delete(baseURL + `/openvidu/api/sessions/${mySessionId}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      console.error(error);
    } finally {
      navigate('/media/roomList', {replace:true})
    }
  }  

  useEffect(() => {
    setMyUserName(nickName);
    setMyUserImg(userImg)
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

  useEffect(() => {
    if (session) {  
      const sessionDisconnectedHandler = () => {
        setLiveEndModalOpen(true);
      };
      session.on('sessionDisconnected', sessionDisconnectedHandler);
      return () => {
        session.off('sessionDisconnected', sessionDisconnectedHandler);
      };
    }
  }, [session]);

  const handleCloseLiveEndModal = () => {
    setLiveEndModalOpen(false);
    navigate('/media/roomList');
  };

  const sendMsg = (msg, currentSession) => {
    currentSession
      .signal({
        data: msg,
        to: [],
        type: "chat",
      })
      .then(() => {
        console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
    {isLoading ? (
      <Loading />
      ) : (
      <div className="bounds">
        {session !== undefined && mainStreamManager !== undefined ? (
          <div>
          <ToolbarComponent
              user={publisher}
              isHost={isHost}
              micStatusChanged={micStatusChanged}
              camStatusChanged={camStatusChanged}
              setLeaveModal={setLeaveModal}
              hostNickname={hostNickname}
              hostProfileImg={hostProfileImg}
              totalUsers={totalUsers}

              setIsSwitchCameraModal={setIsSwitchCameraModal}
          />

            {isHost && <UserVideoComponent streamManager={publisher}></UserVideoComponent>}
            {!isHost && <UserVideoComponent streamManager={subscribers}></UserVideoComponent>}
  
            {chatDisplay && 
              <div className="chatting">
                <ChattingList messageList={messageList}></ChattingList>
                <div className="chat-input-area">
                  <ChattingForm myUserName={myUserName} myUserImg={myUserImg} onMessage={sendMsg} currentSession={session}></ChattingForm>
                  <div className="heart-button-wrapper">
                    <HeartButton session={session} myUserName={myUserName} myUserImg={myUserImg} favIcons={favIcons} setFavIcons={setFavIcons} />
                  </div>
                </div>
              </div>
            }
          </div>
        ) : (
          <div className="noneData">
            <InfoOutlinedIcon />
            <div>존재하지 않는 방송입니다.</div>
            <button onClick={() => navigate('/media/roomList')}>나가기</button>
          </div>
        )}
        
      {leaveModal ? 
        <LeaveModal state={setLeaveModal} leaveSession={leaveSession}/>
        : null  
      }

      {isSwitchCameraModal ?
      <SwitchCameraModal 
        state={setIsSwitchCameraModal} 
        onDevice={switchCamera} 
      />
        :null
      }
      <LiveEndModal open={liveEndModalOpen} onClose={handleCloseLiveEndModal} />
      </div>
      )}
    </>
  );
}

export default VideoRoomComponent;


// import axios from "axios";
// import { OpenVidu } from "openvidu-browser";
// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import UserModel from "./models/user-model";
// import OpenViduLayout from "../openVidu/layout/openvidu-layout";
// import UserVideoComponent from "./UserVideoComponent";
// import ToolbarComponent from '../openVidu/toolbar/ToolbarComponent';
// import ChattingList from "../openVidu/chat/ChattingList"
// import ChattingForm from "../openVidu/chat/ChattingForm"
// import useWindowSize from "../../../components/room/liveSize";
// import LeaveModal from "../../../components/room/LeaveModal";
// import LiveEndModal from "../../../components/room/LiveEndModal";
// import Loading from "../../../components/Loading";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import HeartButton from "./HeartBtn";

// import "./VideoRoomComponent.css";


// var localUser = new UserModel();

// const baseURL = import.meta.env.VITE_BASE_URL
// const OPENVIDU_SERVER_SECRET = "wearegitaehasam"

// const VideoRoomComponent = (props) => {
//   const navigate = useNavigate(); // 네비게이터'
//   const location = useLocation(); // 로케이션(이전 페이지에서 데이터를 받아옴)
//   const size = useWindowSize();

//   const roomId = location.state.roomId
//   const isHost = location.state.isHost;

//   // 방을 생성하여 리스트에서 보여줄 방제목, 썸네일
//   const imageUrl = (location.state.imageUrl ? location.state.imageUrl : null)
//   const name = (location.state.name ? location.state.name : null)

//   // 라이브 방송 중 보여질 유저의 닉네임, 프로필사진
//   const nickName = location.state.nickName
//   const userImg = location.state.userImg

//   const subscriberSession = (location.state.subscriberSession ? location.state.subscriberSession : null)
//   const [apiRoomId, setApiRoomId] = useState(null)

//   const [mySessionId, setMySessionId] = useState('Gitaehasam');
//   const [myUserName, setMyUserName] = useState('');
//   const [session, setSession] = useState(undefined);
//   const [mainStreamManager, setMainStreamManager] = useState(undefined); // 페이지의 메인 비디오 화면(퍼블리셔 또는 참가자의 화면 중 하나)
//   const [messageList, setMessageList] = useState([]); // 메세지 정보를 담을 배열
//   const [publisher, setPublisher] = useState(undefined); // 자기 자신의 캠
//   const [subscribers, setSubscribers] = useState([]); // 다른 유저의 스트림 정보를 저장할 배열
//   const [totalUsers, setTotalUsers] = useState(0); // 총 유저수
//   const [chatDisplay, setChatDisplay] = useState(true); // 채팅창 보이기(초깃값: true) 
//   const [profileImg, setProfileImg] = useState(null);
//   const [isCamera, setIsCamera] = useState(true)
//   const [isAudio, setIsAudio] = useState(true)
//   const [leaveModal, setLeaveModal] = useState(false)
//   const [hostNickname, setHostNickname] = useState('');
//   const [hostProfileImg, setHostProfileImg] = useState('');
//   const [liveEndModalOpen, setLiveEndModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   let OV = undefined;

//   useEffect(() => {
//     if (session && mainStreamManager) {
//       setIsLoading(false);
//     }
//   }, [session, mainStreamManager]);

//   // 토큰 받아오기(KMS로 직접 쏨)
//   const getToken = useCallback(() => {
//     if (isHost) {
//       return createSession(mySessionId)
//       .then((sessionId) => createToken(sessionId));
//     } else {
//       return createToken(subscriberSession);
//     }
//   }, [mySessionId, isHost]);

//   // 세션 생성(KMS로 직접 쏨)
//   const createSession = (sessionId) => {
//     if (isHost) {
//     return new Promise((resolve, reject) => {
//       console.log(roomId)
//       let data = JSON.stringify({ customSessionId: sessionId });
//       axios
//         .post(baseURL + '/openvidu/api/sessions', data, {
//           headers: {
//             Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//             'Content-Type': 'application/json',
//           },
//         })
//         .then((response) => {
//           console.log('CREATE SESION', response);

//           axios.post(baseURL + '/api/lives', {
//             imageUrl:imageUrl,
//             name:name,
//             sessionId:response.data.sessionId,
//           }, {
//             headers: {
//               Authorization: localStorage.getItem("jwt"),
//               'Content-Type': 'application/json',
//             }
//           })
//           .then((res2)=> {
//             console.log("apiRoomId: ", res2.data.id);
//             console.log(res2.data)
//             setApiRoomId(res2.data.id)
//             resolve(response.data.id);
//           })
//           .catch((error) => {
//             console.log('Error on /lives request:', error);
//           });
//         })
//         .catch((response) => {
//           var error = Object.assign({}, response);
//           if (error?.response?.status === 409) {
//             resolve(sessionId);
//           } else {
//             console.log(error);
//           }
//         });
//     });
//   } else {
//     return Promise.resolve(subscriberSession);
//   }
//   }

//   // 토큰 생성(KMS로 직접 쏨)
//   const createToken = (sessionId) => {
//     let myRole = isHost ? "PUBLISHER" : "SUBSCRIBER";
//     console.log(sessionId)
    
//     return new Promise((resolve, reject) => {
//       const data = { role: myRole, sessionId: sessionId }; // 수정된 부분
//       axios
//         .post(baseURL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
//           headers: {
//             Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//             'Content-Type': 'application/json',
//           },
//         })
//         .then((response) => {
//           console.log('TOKEN', response);
//           resolve(response.data.token);
//         })
//         .catch((error) => reject(error));
//     });
//   }

//   let layout;

//   useEffect(() => {
//     setMySessionId(`Gitaehasam${roomId}`);
//   }, [roomId]);
  
//   useEffect(() => {
//     layout = new OpenViduLayout();
//     const openViduLayoutOptions = {
//       maxRatio: 1,
//       minRatio: 1,
//       fixedRatio: true,
//       bigClass: 'OV_big',
//       bigPercentage: 1,
//       bigFixedRatio: false,
//       bigMaxRatio: 1,
//       bigMinRatio: 1,
//       bigFirst: true,
//       animate: true,
//     };
  
//     layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
//     layout.setLayoutOptions(openViduLayoutOptions);
  
//     window.addEventListener('beforeunload', onbeforeunload);
  
//     if (mySessionId !== 'Gitaehasam') {
//       joinSession();
//     }
//   }, [mySessionId]);
  
//   const joinSession = async () => {
//     OV = new OpenVidu(); 

//     let mySession = OV.initSession();
//     setSession(mySession);
//     let token;
//     try {
//       token = await getToken(); 
//     } catch(error) {
//       console.log(error);
//       return; // 에러가 발생하면 함수를 종료합니다.
//     }

//     const publisher = OV.initPublisher(undefined, {
//       audioSource: undefined,
//       videoSource: undefined,
//       publishAudio: isAudio,
//       publishVideo: isCamera,
//       // resolution: `${size.width}x${size.height}`,
//       resolution: `640x480`,
//       frameRate: 30,
//       insertMode: 'APPEND',
//       mirror: false
//     });

//     mySession.connect(token, { clientData: myUserName })
//       .then(() => {
//         mySession.publish(publisher)
//           .then(() => {
//             localUser.setNickname(myUserName);
//             localUser.setConnectionId(mySession.connection.connectionId);
//             localUser.setStreamManager(publisher);
//           })
//         setPublisher(publisher) // 퍼블리셔(스트림 객체)를 담음
//         setMainStreamManager(publisher) // 퍼블리셔(스트림 객체)를 담음
//       });

//     mySession.on('streamCreated', (event) => { // 스트림이 생길 때마다
//       const subscriber = mySession.subscribe(event.stream, 'publisher'); // 퍼블리셔를 구독자로 넣어줌
//       setSubscribers(subscriber)
//     });

//     mySession.on('exception', (exception) => { // 예외 처리
//       console.warn(exception);
//     });

//     mySession.on('connectionCreated', (({ stream }) => { // 유저가 접속할 때마다 인원수를 += 1
//       setTotalUsers((prevTotalUsers) => {
//         return prevTotalUsers + 1
//       })
//     }));

//     mySession.on('connectionDestroyed', (({ stream }) => { // 유저가 접속을 끊을 때마다 -= 1
//       setTotalUsers((prevTotalUsers) => {
//         return prevTotalUsers - 1
//       })
//     }));

//     mySession.on("signal:chat", (event) => { // 채팅 신호 수신하여 메세지 리스트 업데이트
//       setMessageList((prevMessageList) => { 
//         return [...prevMessageList, event.data]
//       })
//     });

//     axios.get(baseURL + '/openvidu/api/sessions/' + mySessionId, {
//       headers: {
//         Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((response) => {
//       const selectedRoom = response.data.publisher;
      
//       if (selectedRoom) {
//         setHostNickname(selectedRoom.nickname);
//         setHostProfileImg(selectedRoom.thumbnail);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
      
//     });
//   };

//   const camStatusChanged = () => {
//     publisher.publishVideo(!publisher.stream.videoActive);
//     setIsCamera(!isCamera)
//     setPublisher(publisher);
//   }

//   const micStatusChanged = () => {
//     publisher.publishAudio(!publisher.stream.audioActive);
//     setIsAudio(!isAudio)
//     setPublisher(publisher);
//   }

//   const switchCamera = async () => {
//     try {
//       const devices = await OV.getDevices();
//       const videoDevices = devices.filter(device => device.kind === 'videoinput');
  
//       if (videoDevices && videoDevices.length > 1) {
//         const newVideoDevice = videoDevices.find(device => device.deviceId !== publisher.stream.videoSource.deviceId);
//         if (newVideoDevice) {
//           const newPublisher = OV.initPublisher(undefined, {
//             audioSource: undefined,
//             videoSource: newVideoDevice.deviceId,
//             publishAudio: publisher.stream.audioActive,
//             publishVideo: publisher.stream.videoActive,
//             mirror: true,
//           });
  
//           await session.unpublish(publisher);
//           await session.publish(newPublisher);
  
//           setPublisher(newPublisher);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const leaveSession = async () => {
//     const mySession = session;
//     if (mySession) {
//       // 속성을 초기화함(필요한 속성은 초기화하면 안 됨)
//       OV = null;
//       setSession(undefined)
//       setSubscribers([])
//       setMySessionId('SessionA')
//       setMyUserName('Participant' + Math.floor(Math.random() * 100))
//       setMainStreamManager(undefined)
//       setPublisher(undefined)
//       setMessageList([])
//       setChatDisplay(true)
//       setTotalUsers((prevTotalUsers) => { return 0 })
//       await deleteRoomRequest(mySession);
//     }
//   }
  
//   const deleteRoomRequest = async (mySessionId) => {
//     console.log(mySessionId)
//     try {
//       await axios.delete(baseURL + `/api/lives/${apiRoomId}`, 
//       {
//         headers: {
//           Authorization: localStorage.getItem("jwt"),
//           'Content-Type': 'application/json',
//         }
//       })
//       await axios.delete(baseURL + `/openvidu/api/sessions/${mySessionId}`, {
//         headers: {
//           Authorization: localStorage.getItem("jwt"),
//           'Content-Type': 'application/json',
//         }
//       })
//       mySessionId.disconnect();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       navigate('/media/roomList')
//     }
//   }

//   // 호스트(방 생성자) 여부에 따른 isHost를 토글링함(created()) + 호스트가 아닐 경우 유저의 이름을 바꿈
//   useEffect(() => {
//     setMyUserName(nickName);
//   }, []);

//   useEffect(() => {
//     const onbeforeunload = (event) => {
//       leaveSession();
//     }
//     window.addEventListener('beforeunload', onbeforeunload); // componentDidMount
//     return () => {
//       window.removeEventListener('beforeunload', onbeforeunload);
//     }
//   }, [leaveSession]);

//   useEffect(() => {
//     if (session) {
//       const sessionDisconnectedHandler = () => {
//         setLiveEndModalOpen(true);
//       };
//       session.on('sessionDisconnected', sessionDisconnectedHandler);
//       return () => {
//         session.off('sessionDisconnected', sessionDisconnectedHandler);
//       };
//     }
//   }, [session]);

//   const handleCloseLiveEndModal = () => {
//     setLiveEndModalOpen(false);
//     navigate('/media/roomList');
//   };

//   const sendMsg = (msg, currentSession) => {
//     currentSession
//       .signal({
//         data: msg,
//         to: [],
//         type: "chat",
//       })
//       .then(() => {
//         console.log("Message successfully sent");
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   return (
//     <>
//     {isLoading ? (
//       <Loading />
//       ) : (
//       <div className="bounds">
//         {session !== undefined && mainStreamManager !== undefined ? (
//           <div>
//           <ToolbarComponent
//             sessionId={mySessionId}
//             user={publisher}
//             isHost={isHost}
//             micStatusChanged={micStatusChanged}
//             camStatusChanged={camStatusChanged}
//             switchCamera={switchCamera}
//             leaveSession={leaveSession}
//             setLeaveModal={setLeaveModal}
//             hostNickname={myUserName}
//             hostProfileImg={hostProfileImg}
//             totalUsers={totalUsers}
//           />
          
//             {isHost && <UserVideoComponent streamManager={publisher}></UserVideoComponent>}
//             {!isHost && <UserVideoComponent streamManager={subscribers}></UserVideoComponent>}
  
//             {chatDisplay && 
//               <div className="chatting">
//                 <ChattingList messageList={messageList}></ChattingList>
//                 <ChattingForm myUserName={myUserName} onMessage={sendMsg} currentSession={session}></ChattingForm>
//               </div>
//             }
//           <HeartButton />
//           </div>
//         ) : (
//           <div className="noneData">
//             <InfoOutlinedIcon />
//             <div>존재하지 않는 방송입니다.</div>
//             <button onClick={() => navigate('/media/roomList')}>나가기</button>
//           </div>
//         )}
        
//       {leaveModal ? 
//         <LeaveModal state={setLeaveModal} leaveSession={leaveSession}/>
//         : null  
//       }
//       <LiveEndModal open={liveEndModalOpen} onClose={handleCloseLiveEndModal} />
//       </div>
//       )}
//     </>
//   );
// }

// export default VideoRoomComponent;