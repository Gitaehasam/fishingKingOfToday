package com.ssafy.sub.pjt.domain;

import javax.persistence.*;
import lombok.*;

// @Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FishingSpotHashtag {
    @Id
    @Column(name = "fishing_spot_hashtag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
}
