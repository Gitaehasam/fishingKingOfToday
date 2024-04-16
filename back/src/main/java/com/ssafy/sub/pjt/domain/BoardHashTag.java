package com.ssafy.sub.pjt.domain;

import java.util.Objects;
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

    public BoardHashTag(Board board, HashTag hashTag) {
        this.board = board;
        this.hashTag = hashTag;
    }

    public boolean hasSameTag(HashTag hashTag) {
        return Objects.equals(this.hashTag, hashTag);
    }
}
