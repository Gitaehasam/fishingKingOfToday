// 각 사용자의 상태와 스트림을 관리하는 데 사용
class UserModel {
    connectionId;
    audioActive;
    videoActive;
    screenShareActive;
    nickname;
    streamManager;
    type; // 'remote' | 'local'

    // 생성자
    constructor() {
        this.connectionId = '';
        this.audioActive = true;
        this.videoActive = true;
        this.screenShareActive = false;
        this.nickname = '';
        this.streamManager = null;
        this.type = 'local';
    }

    isAudioActive() {
        return this.audioActive;
    }

    isVideoActive() {
        return this.videoActive;
    }

    isScreenShareActive() {
        return this.screenShareActive;
    }

    getConnectionId() {
        return this.connectionId;
    }

    getNickname() {
        return this.nickname;
    }

    // 스트림 관리자를 반환
    getStreamManager() {
        return this.streamManager;
    }

    // 로컬 사용자인지 여부
    isLocal() {
        return this.type === 'local';
    }

    // 원격 사용자인지 여부
    isRemote() {
        return !this.isLocal();
    }
    setAudioActive(isAudioActive) {
        this.audioActive = isAudioActive;
    }
    setVideoActive(isVideoActive) {
        this.videoActive = isVideoActive;
    }
    setScreenShareActive(isScreenShareActive) {
        this.screenShareActive = isScreenShareActive;
    }
    setStreamManager(streamManager) {
        this.streamManager = streamManager;
    }

    setConnectionId(conecctionId) {
        this.connectionId = conecctionId;
    }
    setNickname(nickname) {
        this.nickname = nickname;
    }
    setType(type) {
        if (type === 'local' |  type === 'remote') {
            this.type = type;
        }
    }
}

export default UserModel;
