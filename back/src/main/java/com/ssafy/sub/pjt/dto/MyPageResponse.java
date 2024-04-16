package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.domain.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MyPageResponse {

    private final String nickname;

    private final String imageUrl;

    public static MyPageResponse from(final User user) {
        return new MyPageResponse(user.getNickName(), user.getImageUrl());
    }
}
