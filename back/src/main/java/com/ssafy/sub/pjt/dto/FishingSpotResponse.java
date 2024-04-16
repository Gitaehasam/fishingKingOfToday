package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.FishingSpot;
import com.ssafy.sub.pjt.domain.FishingSpotData;
import java.util.List;
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
    private final List<String> hashtags;
    private final String spotPhone;
    private final Integer charge;
    private final String sido;
    private final String streetAddress;
    private final String localAddress;
    private final List<FishingSpotFishProjection> fishes;

    public static FishingSpotResponse of(
            final FishingSpotData fishingSpotData,
            final List<String> hashtags,
            final List<FishingSpotFishProjection> fishes) {
        return new FishingSpotResponse(
                fishingSpotData.getId(),
                fishingSpotData.getName(),
                fishingSpotData.getLatitude(),
                fishingSpotData.getLongitude(),
                fishingSpotData.getSpotType(),
                hashtags,
                fishingSpotData.getSpotPhone(),
                fishingSpotData.getCharge(),
                fishingSpotData.getSido(),
                fishingSpotData.getStreetAddress(),
                fishingSpotData.getLocalAddress(),
                fishes);
    }

    public static FishingSpotResponse of(
            final FishingSpot fishingSpot,
            final List<String> hashtags,
            final List<FishingSpotFishProjection> fishes) {
        return new FishingSpotResponse(
                fishingSpot.getId(),
                fishingSpot.getName(),
                fishingSpot.getLatitude(),
                fishingSpot.getLongitude(),
                fishingSpot.getSpotType(),
                hashtags,
                fishingSpot.getSpotPhone(),
                fishingSpot.getCharge(),
                fishingSpot.getSido(),
                fishingSpot.getStreetAddress(),
                fishingSpot.getLocalAddress(),
                fishes);
    }
}
