package com.ssafy.sub.pjt.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FishingSpotHashtag {
    @Id
    @Column(name = "fishing_spot_hashtag")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "fishing_spot_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private FishingSpot fishingSpot;

    @JoinColumn(name = "hashtag_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private HashTag hashTag;

    public FishingSpotHashtag(FishingSpot fishingSpot, HashTag hashTag) {
        this.fishingSpot = fishingSpot;
        this.hashTag = hashTag;
    }
}
