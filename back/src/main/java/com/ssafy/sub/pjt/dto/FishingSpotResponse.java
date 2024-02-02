package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.FishingSpotData;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class FishingSpotResponse {
    private final Integer spotId;
    private final String name;
    private final Float latitude;
    private final Float longitude;
    private final String spotType;
    // private final List<String> hashtags;
    private final String spotPhone;
    private final Integer charge;
    private final String sido;
    private final String streetAddress;
    private final String localAddress;

    public static FishingSpotResponse of(final FishingSpotData fishingSpotData) {
        return new FishingSpotResponse(
                fishingSpotData.getId(),
                fishingSpotData.getName(),
                fishingSpotData.getLatitude(),
                fishingSpotData.getLongitude(),
                fishingSpotData.getSpotType(),
                // fishingSpotData.getHashtags(),
                fishingSpotData.getSpotPhone(),
                fishingSpotData.getCharge(),
                fishingSpotData.getSido(),
                fishingSpotData.getStreetAddress(),
                fishingSpotData.getLocalAddress());
    }
}
