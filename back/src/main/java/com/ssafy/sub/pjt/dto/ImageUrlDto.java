package com.ssafy.sub.pjt.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ImageUrlDto {

    private final String preSignedUrl;
    private final String key;

    public static ImageUrlDto of(String url, String key) {
        return ImageUrlDto.builder().preSignedUrl(url).key(key).build();
    }
}
