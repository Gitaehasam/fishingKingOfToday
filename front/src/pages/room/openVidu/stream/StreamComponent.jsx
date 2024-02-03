import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

// 각 사용자의 비디오 스트림과 상태를 표시하는 컴포넌트
export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { showForm: false, mutedSound: false, isFormValid: true };
  }

    // 음소거 on/off
    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    render() {
      return (
        <div className="OT_widget-container">
          {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
            <div className="streamComponent">
              <OvVideoComponent user={this.props.user} mutedSound={this.state.mutedSound} streamManager={this.props.streamManager}/>
              <div id="statusIcons">
                {!this.props.user.isVideoActive() ? (
                  <div id="camIcon">
                      <span id="statusCam">비디오 끄기</span>
                  </div>
                ) : null}

                {!this.props.user.isAudioActive() ? (
                  <div id="micIcon">
                      <span id="statusMic">마이크 끄기</span>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      );
    }
}
