package com.ssafy.sub.pjt.exception;

import com.ssafy.sub.pjt.common.CustomException;
import com.ssafy.sub.pjt.common.CustomExceptionStatus;

public class UserNotFoundException extends CustomException {
    public static final CustomException EXCEPTION = new UserNotFoundException();

    private UserNotFoundException() {
        super(CustomExceptionStatus.ACCOUNT_NOT_FOUND);
    }
}
