import React, { Component } from 'react';
import './ToolbarComponent.css';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';



export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }


  micStatusChanged() {
      this.props.micStatusChanged();
  }

  camStatusChanged() {
      this.props.camStatusChanged();
  }

  switchCamera() {
      this.props.switchCamera();
  }

  leaveSession() {
      this.props.leaveSession();
  }

  toggleChat() {
      this.props.toggleChat();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <>
        {this.props.sessionId && 
        <div>
          <span>{mySessionId}</span>
        </div>}

        <div className='option-btn'>
          <CloseOutlinedIcon onClick={this.leaveSession}/>

          {localUser !== undefined && localUser.isAudioActive() ? (
            <MicNoneOutlinedIcon onClick={this.micStatusChanged}/> 
          ) : (
          <MicOffOutlinedIcon onClick={this.micStatusChanged}/>
        )}

          {localUser !== undefined && localUser.isVideoActive() ? (
            <VideocamOutlinedIcon onClick={this.camStatusChanged}/>
          ) : (
            <VideocamOffOutlinedIcon onClick={this.camStatusChanged}/>
          )}

          <LoopOutlinedIcon onClick={this.switchCamera}/>
        </div>
      </>
    );
  }
}
