package com.ssafy.sub.pjt.exception;

import com.ssafy.sub.pjt.common.CustomExceptionStatus;
import lombok.Getter;

@Getter
public class AuthException extends RuntimeException {

    private final int code;
    private final String message;

    public AuthException(final CustomExceptionStatus customExceptionStatus) {
        this.code = customExceptionStatus.getCode();
        this.message = customExceptionStatus.getMessage();
    }
}
