package com.ssafy.sub.pjt.domain;

import com.ssafy.sub.pjt.dto.SpotType;
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

    @Enumerated(EnumType.STRING)
    private SpotType spotType;

    @Column(name = "spot_phone")
    private String spotPhone;

    @Column private Integer charge;

    @Column(nullable = false)
    private String sido;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "local_address")
    private String localAddress;
}
