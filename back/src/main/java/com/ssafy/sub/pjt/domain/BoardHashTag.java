package com.ssafy.sub.pjt.domain;

import javax.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardHashTag {

    @Id
    @Column(name = "board_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "board_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Board board;

    @JoinColumn(name = "hashtag_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private HashTag hashTag;
}
