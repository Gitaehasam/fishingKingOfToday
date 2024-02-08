package com.ssafy.sub.pjt.domain;

import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BoardData {
    private String nickName;
    private String profileImageUrl;
    private Integer boardId;
    private Image boardImageUrl;
    private String fishName;
    private List<String> hashtags;
    private String fishName;
    private String content;
    private LocalDateTime createdAt;
    private Integer commentCnt;
    private Integer likeCnt;

    public void setHashTags(List<String> hashtags) {
        this.hashtags = hashtags;
    }

    public void setFishName(String fishName) {
        this.fishName = fishName;
    }

    public BoardData(
            String nickName,
            String profileImageUrl,
            Integer boardId,
            Image boardImageUrl,
            String fishName,
            String content,
            LocalDateTime createdAt,
            Integer commentCnt,
            Integer likeCnt) {
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;
        this.boardId = boardId;
        this.boardImageUrl = boardImageUrl;
        this.fishName = fishName;
        this.content = content;
        this.createdAt = createdAt;
        this.commentCnt = commentCnt;
        this.likeCnt = likeCnt;
    }
}
