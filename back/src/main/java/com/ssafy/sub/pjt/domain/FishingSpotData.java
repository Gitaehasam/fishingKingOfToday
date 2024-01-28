package com.ssafy.sub.pjt.domain;

import com.ssafy.sub.pjt.dto.SpotType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FishingSpotData {
    private Integer id;
    private String name;
    private Float latitude;
    private Float longitude;
    private SpotType spotType;
    // private List<String> hashtags;
    private String spotPhone;
    private Integer charge;
    private String sido;
    private String streetAddress;
    private String localAddress;
}
