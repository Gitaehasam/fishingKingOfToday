package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.domain.FishBook;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public class FishBookDetailResponse {

    private final Integer fishBookId;
    private final String name;
    private final String scientificName;
    private final FishType fishtype;
    private final String size;
    private final String habitat;
    private final String bait;
    private final String interview;
    private final String detailImageUrl;

    public static FishBookDetailResponse of(FishBook fishBook) {
        return new FishBookDetailResponse(
                fishBook.getId(),
                fishBook.getName(),
                fishBook.getScientificName(),
                fishBook.getFishtype(),
                fishBook.getSize(),
                fishBook.getHabitat(),
                fishBook.getBait(),
                fishBook.getInterview(),
                fishBook.getDetailImageUrl());
    }
}
