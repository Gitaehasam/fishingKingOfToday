package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.Comment;
import com.ssafy.sub.pjt.domain.User;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class CommentResponse {

    private final Integer id;
    private final String profileImageUrl;
    private final String socialId;
    private final String nickName;
    private final String content;
    private final LocalDateTime createdAt;

    public static CommentResponse of(final Comment comment, final User user) {
        return new CommentResponse(
                comment.getId(),
                user.getImageUrl(),
                user.getSocialId(),
                user.getNickName(),
                comment.getContent(),
                comment.getCreatedAt());
    }
}
