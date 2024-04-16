package com.ssafy.sub.pjt.domain;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.BOARD_NOT_BELONG_TO_USER_EXCEPTION;

import com.ssafy.sub.pjt.exception.BadRequestException;
import java.util.List;
import javax.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    private String name;

    @Column(name = "nick_name")
    private String nickName;

    @Column(name = "social_id", unique = true)
    private String socialId;

    private String platform;

    private String imageUrl;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Board> boards;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<LiveRoom> liveRooms;

    public boolean isNicknameChanged(final String inputNickname) {
        return !nickName.equals(inputNickname);
    }

    public void delete(Board board) {
        if (board.isNotWrittenBy(this)) {
            throw new BadRequestException(BOARD_NOT_BELONG_TO_USER_EXCEPTION);
        }

        boards.remove(board);
    }

    public void updateNickName(String nickName) {
        this.nickName = nickName;
    }

    public void updateImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
