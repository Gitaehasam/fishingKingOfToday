package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.BoardData;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class BoardResponse {

    private final String nickName;
    private final String profileImageUrl;
    private final Integer boardId;
    private final String boardImageUrl;
    private final String fishName;
    private final List<String> hashtags;
    private final String content;
    private final LocalDateTime createdAt;
    private final Integer commentCnt;
    private final Integer likeCnt;

    public static BoardResponse of(
            final BoardData boardData, final Integer commentCnt, final Integer likeCnt) {
        return new BoardResponse(
                boardData.getNickName(),
                boardData.getProfileImageUrl(),
                boardData.getBoardId(),
                boardData.getBoardImageUrl().getUrl(),
                boardData.getFishName(),
                boardData.getHashtags(),
                boardData.getContent(),
                boardData.getCreatedAt(),
                commentCnt,
                likeCnt);
    }
}
