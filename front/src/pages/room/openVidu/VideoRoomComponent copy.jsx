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
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(baseURL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {

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

    mySession.on("sessionDisconnected", (({ stream }) => {
      alert('라이브가 종료되었습니다.');
      navigate('/media/roomList', {replace:true})
    }))

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
    OV = new OpenVidu(); 
    try {
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
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        },
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