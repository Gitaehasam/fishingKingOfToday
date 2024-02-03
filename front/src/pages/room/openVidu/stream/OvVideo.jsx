import React, { Component } from 'react';
import './StreamComponent.css';

export default class OvVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();

        console.log(props)
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return <video autoPlay={true} ref={this.videoRef} />;
    }

}
