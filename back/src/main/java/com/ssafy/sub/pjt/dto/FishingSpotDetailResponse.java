package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.domain.FishingSpot;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public class FishingSpotDetailResponse {
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
    private final List<String> fishes;
    private final List<BoardResponse> boards;

    public static FishingSpotDetailResponse of(
            final FishingSpot fishingSpot,
            final List<String> hashtags,
            final List<String> fishes,
            final List<BoardResponse> boards) {
        return new FishingSpotDetailResponse(
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
                fishes,
                boards);
    }
}
