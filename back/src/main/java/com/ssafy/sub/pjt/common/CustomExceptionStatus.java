package com.ssafy.sub.pjt.common;

public enum CustomExceptionStatus {
    SUCCESS(1000, "요청에 성공하였습니다."),

    REQUEST_ERROR(1100, "입력 값을 확인해 주세요."),
    EMPTY_JWT(1101, "토큰이 없습니다."),
    INVALID_JWT(1102, "유효하지 않은 토큰입니다."),
    INVALID_REFRESH_TOKEN(1103, "유효하지 않은 RefreshToken 입니다."),
    NOT_AUTHENTICATED_ACCOUNT(1104, "로그인이 필요합니다."),
    INVALID_KEY(1105, "유효하지 않는 key 값입니다."),
    PLATFORM_NOT_FOUND(1200, "존재하지 않는 플랫폼입니다."),
    ACCOUNT_ALREADY_EXIST(1201, "다른 플랫폼에 해당 이메일로 가입된 계정이 존재합니다."),
    ACCOUNT_ACCESS_DENIED(1202, "권한이 없습니다."),
    ACCOUNT_NOT_FOUND(1203, "존재하지 않는 계정입니다."),

    NOT_SUPPORTED_OAUTH_SERVICE(1204, "해당 OAuth 서비스는 제공하지 않습니다."),

    FAIL_TO_GENERATE_RANDOM_NICKNAME(1205, "랜덤한 닉네임을 생성하는데 실패하였습니다."),
    INVALID_AUTHORIZATION_CODE(1206, "유효하지 않은 인증 코드입니다."),
    NOT_FOUND_MEMBER_ID(1207, "요청한 ID에 해당하는 멤버가 존재하지 않습니다."),

    NOT_FOUND_CATEGORY(2000, "카테고리를 찾을 수 없습니다."),
    CANNOT_ADD_HASHTAG_EXCEPTION(2001, "해시 태그를 추가 할 수 없습니다."),
    HASHTAG_FORMAT_EXCEPTION(2002, "해시 태그 포맷이 잘못되었습니다."),

    NOT_FOUND_FISH(3000, "도감에서 존재하지 않는 어종입니다.");

    private final int code;
    private final String message;

    private CustomExceptionStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
