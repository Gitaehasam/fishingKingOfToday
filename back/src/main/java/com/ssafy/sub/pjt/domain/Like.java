package com.ssafy.sub.pjt.domain;

import javax.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Builder
@Getter
@AllArgsConstructor
@Table(name = "LIKES")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Like like = (Like) o;
        return Objects.equals(board, like.getBoard()) &&
                Objects.equals(user, like.getUser());
    }

    @Override
    public int hashCode() {
        return Objects.hash(board, user);
    }
}
