import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoRoomComponent from './openVidu/VideoRoomComponent';

function LiveStream(props) {

  const location = useLocation()
  const sessionId = location.state.sessionId

  return (
    <div>
      <VideoRoomComponent sessionName={sessionId} />
    </div>
  );
}

export default LiveStream;