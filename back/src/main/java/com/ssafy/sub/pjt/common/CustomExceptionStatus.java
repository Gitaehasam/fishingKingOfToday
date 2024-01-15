package com.ssafy.sub.pjt.common;

public enum CustomExceptionStatus {
    SUCCESS(true, 1000, "요청에 성공하였습니다."),

    REQUEST_ERROR(false, 1100, "입력 값을 확인해 주세요."),
    EMPTY_JWT(false, 1101, "토큰이 없습니다."),
    INVALID_JWT(false, 1102, "유효하지 않은 토큰입니다."),
    INVALID_REFRESH_TOKEN(false, 1103, "유효하지 않은 RefreshToken 입니다."),
    NOT_AUTHENTICATED_ACCOUNT(false, 1104, "로그인이 필요합니다."),
    INVALID_KEY(false, 1105, "유효하지 않는 key 값입니다."),
    PLATFORM_NOT_FOUND(false, 1200, "존재하지 않는 플랫폼입니다."),
    ACCOUNT_ALREADY_EXIST(false, 1201, "다른 플랫폼에 해당 이메일로 가입된 계정이 존재합니다."),
    ACCOUNT_ACCESS_DENIED(false, 1202, "권한이 없습니다."),
    ACCOUNT_NOT_FOUND(false, 1203, "존재하지 않는 계정입니다."),

    NOT_SUPPORTED_OAUTH_SERVICE(false, 1204, "해당 OAuth 서비스는 제공하지 않습니다."),

    FAIL_TO_GENERATE_RANDOM_NICKNAME(false, 1205, "랜덤한 닉네임을 생성하는데 실패하였습니다."),
    INVALID_AUTHORIZATION_CODE(false, 1206, "유효하지 않은 인증 코드입니다."),
    NOT_FOUND_MEMBER_ID(false, 1207, "요청한 ID에 해당하는 멤버가 존재하지 않습니다.");

    private final boolean isSuccess;
    private final int code;
    private final String message;

    private CustomExceptionStatus(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
