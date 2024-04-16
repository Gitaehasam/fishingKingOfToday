package com.ssafy.sub.pjt.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class MyFishResponse {

    private final Integer fishId;

    private final List<LocalDateTime> createdAt;

    public static MyFishResponse of(final Integer fishId, final List<LocalDateTime> createdAt) {
        return new MyFishResponse(fishId, createdAt);
    }
}
