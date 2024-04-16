package com.ssafy.sub.pjt.dto.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImageFileExtension {
    JPEG("jpeg"),
    JPG("jpg"),
    PNG("png"),
    HEIC("heic");

    private final String uploadExtension;
}
