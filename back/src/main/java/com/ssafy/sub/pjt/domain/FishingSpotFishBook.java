package com.ssafy.sub.pjt.domain;

import javax.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FishingSpotFishBook {

    @Id
    @Column(name = "fishing_spot_fish_book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "fishing_spot_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private FishingSpot fishingSpot;

    @JoinColumn(name = "fish_book_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private FishBook fishBook;

    public FishingSpotFishBook(FishingSpot fishingSpot, FishBook fishBook) {
        this.fishingSpot = fishingSpot;
        this.fishBook = fishBook;
    }
}
