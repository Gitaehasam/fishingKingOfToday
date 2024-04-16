package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.domain.BoardHashTag;
import java.io.Serializable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class HashTagResponse implements Serializable {

    private final Integer id;
    private final String name;

    public static HashTagResponse of(final BoardHashTag hashTag) {
        return new HashTagResponse(hashTag.getHashTag().getId(), hashTag.getHashTag().getName());
    }
}
