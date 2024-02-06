package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.FishBook;
import java.time.LocalDate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class FishBookResponse {

    private final Integer id;
    private final String name;
    private final LocalDate tabooStartAt;
    private final LocalDate tabooEndAt;
    private final Integer mininumSize;
    private final FishType fishType;
    private final String imageUrl;

    public static FishBookResponse of(final FishBook fishBook) {
        return new FishBookResponse(
                fishBook.getId(),
                fishBook.getName(),
                fishBook.getTabooStartAt(),
                fishBook.getTabooEndAt(),
                fishBook.getMinimumSize(),
                fishBook.getFishType(),
                fishBook.getImageUrl());
    }
}
