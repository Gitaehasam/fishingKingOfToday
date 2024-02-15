package com.ssafy.sub.pjt.common;

public enum CustomExceptionStatus {
    SUCCESS(1000, "요청에 성공하였습니다."),
    INVALID_REQUEST(1001, "올바르지 않은 요청입니다."),

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
    FAILED_TO_DISCONNECT_SOCIAL(1208, "가입하신 소셜 계정과의 연결 해제에 실패했습니다."),

    NOT_FOUND_CATEGORY(2000, "카테고리를 찾을 수 없습니다."),
    CANNOT_ADD_HASHTAG_EXCEPTION(2001, "해시 태그를 추가 할 수 없습니다."),
    HASHTAG_FORMAT_EXCEPTION(2002, "해시 태그 포맷이 잘못되었습니다."),
    INVALID_BOARD_WITH_USER(2003, "요청한 멤버와 ID에 해당하는 게시물이 존재하지 않습니다."),
    NOT_FOUND_BOARD_ID(2004, "요청한 ID에 해당하는 게시물이 존재하지 않습니다."),
    BOARD_NOT_BELONG_TO_USER_EXCEPTION(2005, "해당하는 사용자의 게시물이 아닙니다."),
    COMMENT_NOT_FOUND_EXCEPTION(2006, "해당 댓글이 존재하지 않습니다."),
    CANNOT_DELETE_COMMENT_EXCEPTION(2007, "남 게시물, 남 댓글은 삭제할 수 없습니다."),
    NOT_EQUAL_CATEGORY(2008, "작성한 카테고리와 다릅니다."),
    REQUIRED_FISHBOOKID(2009, "물고기 ID가 필요합니다."),

    NOT_FOUND_FISH(3000, "도감에서 존재하지 않는 어종입니다."),

    NOT_FOUND_LIVEROOM(4000, "존재하지 않는 라이브 방 입니다."),

    NOT_FOUND_FISHING_SPOT(5000, "존재하지 않는 낚시터입니다."),

    EXCEED_IMAGE_CAPACITY(6000, "업로드 가능한 이미지 용량을 초과했습니다."),
    NULL_IMAGE(6001, "업로드한 이미지 파일이 NULL입니다."),
    EMPTY_IMAGE_LIST(6002, "최소 한 장 이상의 이미지를 업로드해야합니다."),
    EXCEED_IMAGE_LIST_SIZE(6003, "업로드 가능한 이미지 개수를 초과했습니다."),
    INVALID_IMAGE_URL(6004, "요청한 이미지 URL의 형식이 잘못되었습니다."),
    INVALID_IMAGE_PATH(6005, "이미지를 저장할 경로가 올바르지 않습니다."),
    FAIL_IMAGE_NAME_HASH(6006, "이미지 이름을 해싱하는 데 실패했습니다."),
    INVALID_IMAGE(6107, "올바르지 않은 이미지 파일입니다."),

    NOT_FOUND_TUTORIAL(7000, "튜토리얼을 찾을 수 없습니다."),

    INTERNAL_SEVER_ERROR(9999, "서버 에러가 발생하였습니다. 관리자에게 문의해 주세요.");

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
