package com.ssafy.sub.pjt.domain;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class BoardParentResponse {

    private final String nickName;
    private final String profileImageUrl;
    private final Integer boardId;
    // private final List<String> hashtags;
    private final String content;
    private final LocalDateTime createdAt;
    private final Integer commentCnt;
    private final Integer likeCnt;
}
