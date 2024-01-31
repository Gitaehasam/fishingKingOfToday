package com.ssafy.sub.pjt.domain;

import java.util.List;
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
    private String spotType;
    private List<String> hashtags;
    private String spotPhone;
    private Integer charge;
    private String sido;
    private String streetAddress;
    private String localAddress;

    public void setHashTags(List<String> hashtags) {
        this.hashtags = hashtags;
    }

    public FishingSpotData(
            Integer id,
            String name,
            Float latitude,
            Float longitude,
            String spotType,
            Integer charge,
            String spotPhone,
            String sido,
            String streetAddress,
            String localAddress) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.spotType = spotType;
        this.charge = charge;
        this.spotPhone = spotPhone;
        this.sido = sido;
        this.streetAddress = streetAddress;
        this.localAddress = localAddress;
    }
}
