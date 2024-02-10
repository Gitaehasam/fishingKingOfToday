package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.domain.Board;
import com.ssafy.sub.pjt.domain.FishBook;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardDetailResponse {
    private final String nickName;
    private final String socialId;
    private final String profileImageUrl;
    private final Integer boardId;
    private final String boardImageUrl;
    private final String fishName;
    private final List<String> hashtags;
    private final String content;
    private final LocalDateTime createdAt;
    private final Integer commentCnt;
    private final List<CommentResponse> comments;
    private final Integer likeCnt;
    private final Boolean isLiked;
    private final Float longitude;
    private final Float latitude;

    public static BoardDetailResponse of(Board board, String socialId) {
        return new BoardDetailResponse(
                board.getUser().getNickName(),
                board.getUser().getSocialId(),
                board.getUser().getImageUrl(),
                board.getId(),
                board.getImage().getUrl(),
                Optional.ofNullable(board.getFishBook()).map(FishBook::getName).orElse(null),
                board.getBoardHashTags().stream()
                        .map(hashTag -> hashTag.getHashTag().getName())
                        .collect(Collectors.toList()),
                board.getContent(),
                board.getCreatedAt(),
                board.getComments().size(),
                board.getComments().stream()
                        .map(comment -> CommentResponse.of(comment, comment.getUser()))
                        .collect(Collectors.toList()),
                board.getLikeCounts(),
                board.isLiked(socialId),
                board.getFishingSpot().getLongitude(),
                board.getFishingSpot().getLatitude());
    }
}
