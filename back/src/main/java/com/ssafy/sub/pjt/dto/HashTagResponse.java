package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.domain.BoardHashTag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class HashTagResponse {

    private final Integer id;
    private final String name;

    public static HashTagResponse of(final BoardHashTag hashTag) {
        return new HashTagResponse(hashTag.getId(), hashTag.getHashTag().getName());
    }
}
