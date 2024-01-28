package com.ssafy.sub.pjt.domain;

import com.ssafy.sub.pjt.dto.SpotType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FishingSpotSearchCondition {
    private String sortType;
    private Integer fishBookId;
    private SpotType spotType;
    private String sido;
    private String keyword;
    private Float latitude;
    private Float longitude;
}
