package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class LikeResponse {

    private final Integer likesCount;
    private final Boolean liked;

    public static LikeResponse of(final Integer likesCount, final Boolean liked) {
        return new LikeResponse(likesCount, liked);
    }
}
