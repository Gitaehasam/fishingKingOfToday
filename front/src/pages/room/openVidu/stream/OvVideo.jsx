import React, { Component } from 'react';
import './StreamComponent.css';

// 비디오 요소를 추가하고, 화면 공유 활성화 상태가 변경될 때마다 비디오 요소를 다시 추가하여 화면에 비디오를 표시
export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log('PROPS: ', this.props);
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
      this.props.user.streamManager.session.on('signal:userChanged', (event) => {
        const data = JSON.parse(event.data);

        // 화면 공유 활성화 상태가 변경되면 비디오 요소를 다시 추가
        if (data.isScreenShareActive !== undefined) {
          this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }
      });
    }
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <video
        autoPlay={true}
        id={'video-' + this.props.user.getStreamManager().stream.streamId}
        ref={this.videoRef}
        muted={this.props.mutedSound}
      />
    );
  }
}
