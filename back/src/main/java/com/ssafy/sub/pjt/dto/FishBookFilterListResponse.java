package com.ssafy.sub.pjt.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FishBookFilterListResponse {

    private final List<FishBookFilterResponse> sea;
    private final List<FishBookFilterResponse> freshWater;
}
