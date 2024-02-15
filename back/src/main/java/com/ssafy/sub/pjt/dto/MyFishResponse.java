package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.domain.Board;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class MyFishResponse {

    private final Integer id;

    private final String fishName;

    private final LocalDateTime createdAt;

    private final String fishingSpotName;

    public static MyFishResponse of(final Board board) {
        return new MyFishResponse(
                board.getFishBook().getId(),
                board.getFishBook().getName(),
                board.getCreatedAt(),
                board.getFishingSpot().getName());
    }
}
