package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.Board;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class BoardResponse {

    private final String nickName;
    private final String profileImageUrl;
    private final Integer boardId;
    private final String boardImageUrl;
    private final List<String> hashtags;
    private final String content;
    private final LocalDateTime createdAt;
    private final Integer commentCnt;
    private final Integer likeCnt;

    public static BoardResponse of(
            final Board board, final Integer commentCnt, final Integer likeCnt) {
        return new BoardResponse(
                board.getUser().getNickName(),
                board.getUser().getImageUrl(),
                board.getId(),
                board.getImage().getUrl(),
                board.getBoardHashTags().stream()
                        .map(hashtag -> hashtag.getHashTag().getName())
                        .collect(Collectors.toList()),
                board.getContent(),
                board.getCreatedAt(),
                commentCnt,
                likeCnt);
    }
}
