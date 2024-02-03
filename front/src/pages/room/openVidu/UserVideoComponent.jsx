import React, { Component } from 'react';
import OvVideoComponent from './stream/OvVideo';

export default class UserVideoComponent extends Component {

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OvVideoComponent streamManager={this.props.streamManager} />
                        {/* <div><p>{this.getNicknameTag()}</p></div> */}
                    </div>
                ) : <span>호스트가 없습니다.</span>}
            </div>
        );
    }
}
