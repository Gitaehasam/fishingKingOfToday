package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.FishingSpot;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class FishingSpotAutoCompleteResponse {

    private final Integer id;
    private final String name;

    public static FishingSpotAutoCompleteResponse of(final FishingSpot fishingSpot) {
        return new FishingSpotAutoCompleteResponse(fishingSpot.getId(), fishingSpot.getName());
    }
}
