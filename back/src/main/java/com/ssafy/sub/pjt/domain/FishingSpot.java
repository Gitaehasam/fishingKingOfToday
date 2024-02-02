package com.ssafy.sub.pjt.domain;

import java.util.List;
import javax.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FishingSpot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spot_id")
    private Integer id;

    @Column(length = 30, nullable = false)
    private String name;

    @Column(nullable = false)
    private Float latitude;

    @Column(nullable = false)
    private Float longitude;

    @Column(name = "spot_type")
    private String spotType;

    @Column(name = "spot_phone")
    private String spotPhone;

    @Column private Integer charge;

    @Column(nullable = false)
    private String sido;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "local_address")
    private String localAddress;

    @OneToMany(
            mappedBy = "fishingSpot",
            fetch = FetchType.LAZY,
            cascade = CascadeType.PERSIST,
            orphanRemoval = true)
    private List<FishingSpotFishBook> fishingSpotFishBooks;
}
