package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.util.ApiImageUrlUtil;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IssuePreSignedUrlResponse {

    private final String preSignedUrl;

    private final String imageUrl;

    public static IssuePreSignedUrlResponse from(ImageUrlDto urlDto) {
        String imgUrl = ApiImageUrlUtil.prefix + urlDto.getKey();

        return IssuePreSignedUrlResponse.builder()
                .preSignedUrl(urlDto.getPreSignedUrl())
                .imageUrl(imgUrl)
                .build();
    }
}
