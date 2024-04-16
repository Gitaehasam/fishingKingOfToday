package com.ssafy.sub.pjt.dto.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImageUploadType {
    BOARD("board"),
    PROFILE("profile"),
    LIVEROOM("liveRoom");

    private final String type;
}
