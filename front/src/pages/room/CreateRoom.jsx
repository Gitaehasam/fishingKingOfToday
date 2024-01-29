import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { OpenVidu } from 'openvidu-browser';
import back from '../../assets/images/backSymbol.svg';

function CreateRoom() {
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState('');
  // const [OV, setOV] = useState(null);
  // const [session, setSession] = useState(null);
  // const [publisher, setPublisher] = useState(null);

  // const OPENVIDU_SERVER_URL = 'https://YOUR_OPENVIDU_SERVER';
  // const OPENVIDU_SERVER_SECRET = 'YOUR_OPENVIDU_SECRET';
  // const MY_SESSION_ID = 'YOUR_SESSION_ID';

  // useEffect(() => {
  //   const ov = new OpenVidu();
  //   setOV(ov);

  //   const _session = ov.initSession();
  //   setSession(_session);

  //   const _publisher = ov.initPublisher(undefined, {
  //     audioSource: undefined,
  //     videoSource: undefined,
  //     publishAudio: true,
  //     publishVideo: true,
  //     resolution: '640x480',
  //     frameRate: 30,
  //     insertMode: 'APPEND',
  //     mirror: false,
  //   });
  //   setPublisher(_publisher);

  //   _session.on('streamCreated', (event) => {
  //     _session.subscribe(event.stream, 'subscriber');
  //   });

  //   getToken(OPENVIDU_SERVER_URL, OPENVIDU_SERVER_SECRET, MY_SESSION_ID)
  //     .then((token) => _session.connect(token))
  //     .then(() => _session.publish(_publisher))
  //     .catch((error) => console.log('There was an error connecting to the session:', error));

  // }, []);

  // const getToken = async (openviduServerUrl, openviduSecret, sessionId) => {
  //   const response = await fetch(openviduServerUrl + '/api/sessions', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + openviduSecret),
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ customSessionId: sessionId }),
  //   });
  //   const data = await response.json();
  //   const token = data.id;

  //   return token;
  // };

  return (
    <>
      <div>
        <div className="roomList-header" onClick={() => navigate('/roomList')}>
          <img src={back} alt="" />
          <span> 라이브</span>
        </div>
        {/* <div id="publisher"></div>
        <div id="subscriber"></div> */}
      </div>
    </>
  );
}

export default CreateRoom;
