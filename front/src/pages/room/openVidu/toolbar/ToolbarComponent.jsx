import React, {useState, useEffect} from 'react';
import './ToolbarComponent.css';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';

const ToolbarComponent = ({ 
  sessionId, 
  user, 
  isHost, 
  micStatusChanged, 
  camStatusChanged, 
  switchCamera,
  leaveSession, 
}) => {

  const [audioActive, setAudioActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);

  useEffect(() => {
    setAudioActive(user.stream.audioActive)
  }, [user.stream.audioActive])

  useEffect(() => {
    setVideoActive(user.stream.videoActive)
  }, [user.stream.videoActive])

  return (
    <>
      <div className='option-btn'>
        <span>{sessionId}</span>
        <CloseOutlinedIcon onClick={leaveSession}/>

        {isHost && (
          <>
            {audioActive ? (
              <MicNoneOutlinedIcon onClick={micStatusChanged}/> 
            ) : (
              <MicOffOutlinedIcon onClick={micStatusChanged}/>
            )}

            {videoActive ? (
              <VideocamOutlinedIcon onClick={camStatusChanged}/>
            ) : (
              <VideocamOffOutlinedIcon onClick={camStatusChanged}/>
            )}

            <LoopOutlinedIcon onClick={switchCamera}/>
          </>
        )}

      </div>
    </>
  );
}

export default ToolbarComponent;
