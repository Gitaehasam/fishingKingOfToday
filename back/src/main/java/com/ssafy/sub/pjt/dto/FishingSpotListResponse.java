package com.ssafy.sub.pjt.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FishingSpotListResponse {
    private final List<FishingSpotResponse> spots;
    private final Boolean hasNext;
}
