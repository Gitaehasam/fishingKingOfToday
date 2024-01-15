package com.ssafy.sub.pjt.common;

public class CustomException extends RuntimeException {

    private CustomExceptionStatus customExceptionStatus;

    public CustomException(CustomExceptionStatus customExceptionStatus) {
        super();
        this.customExceptionStatus = customExceptionStatus;
    }

    public CustomExceptionStatus getCustomExceptionStatus() {
        return customExceptionStatus;
    }
}
