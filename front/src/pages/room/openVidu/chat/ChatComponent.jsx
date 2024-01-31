import React, { Component } from 'react';
import './ChatComponent.css';

// 채팅 기능을 구현하는 컴포넌트
export default class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            message: '',
        };
        this.chatScroll = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.close = this.close.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }


    componentDidMount() {
        this.props.user.getStreamManager().stream.session.on('signal:chat', (event) => {
            const data = JSON.parse(event.data);
            let messageList = this.state.messageList;       // 연결 ID, 닉네임, 메시지 텍스트를 포함하는 객체
            messageList.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message });
            const document = window.document;
            setTimeout(() => {
                const userImg = document.getElementById('userImg-' + (this.state.messageList.length - 1));
            }, 50);
            this.setState({ messageList: messageList });
            this.scrollToBottom();
        });
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handlePressKey(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    sendMessage() {
        console.log(this.state.message);
        if (this.props.user && this.state.message) {
            let message = this.state.message.replace(/ +(?= )/g, '');
            if (message !== '' && message !== ' ') {
                const data = { message: message, nickname: this.props.user.getNickname(), streamId: this.props.user.getStreamManager().stream.streamId };
                this.props.user.getStreamManager().stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        this.setState({ message: '' });
    }

    // 채팅 스크롤을 맨 아래로 이동
    scrollToBottom() {
        setTimeout(() => {
            try {
                this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }

    close() {
        this.props.close(undefined);
    }

    render() {
        const styleChat = { display: this.props.chatDisplay };
        return (
            <div id="chatContainer">
                <div id="chatComponent" style={styleChat}>
                    <div className="message-wrap" ref={this.chatScroll}>
                        {this.state.messageList.map((data, i) => (
                            <div
                                key={i}
                                id="remoteUsers"
                                className={
                                    'message' + (data.connectionId !== this.props.user.getConnectionId() ? ' left' : ' left')
                                }
                            >
                                <canvas id={'userImg-' + i} width="60" height="60" className="user-img" />
                                <div className="msg-detail">
                                    <div className="msg-info">
                                        <p> {data.nickname}</p>
                                    </div>
                                    <div className="msg-content">
                                        <span className="triangle" />
                                        <p className="text">{data.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="messageInput">
                        <input
                            placeholder="댓글 달기"
                            id="chatInput"
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyPress={this.handlePressKey}
                        />
                        <div title="Send message">
                            <div size="small" id="sendButton" onClick={this.sendMessage}>
                                {/* <span>전송</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
