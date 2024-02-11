package com.ssafy.sub.pjt.exception;

import com.ssafy.sub.pjt.common.CustomExceptionStatus;
import lombok.Getter;

@Getter
public class ImageException extends BadRequestException {
    public ImageException(final CustomExceptionStatus customExceptionStatus) {
        super(customExceptionStatus);
    }
}
