package com.ssafy.sub.pjt.common;

import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.dto.MyPageRequest;
import java.time.LocalDateTime;

public class UserFactory {

    public static User mockUser() {
        return User.builder()
                .id(1L)
                .name("testUser")
                .nickName("IU")
                .socialId("socialId00")
                .platform("KAKAO")
                .imageUrl(
                        "https://pokemon.fandom.com/ko/wiki/%ED%94%BC%EC%B9%B4%EC%B8%84_(%ED%8F%AC%EC%BC%93%EB%AA%AC)")
                .joinAt(LocalDateTime.now())
                .lastLoginAt(LocalDateTime.now())
                .build();
    }

    public static MyPageRequest mockMyPageRequest() {
        return new MyPageRequest(
                "IU",
                "https://pokemon.fandom.com/ko/wiki/%ED%94%BC%EC%B9%B4%EC%B8%84_(%ED%8F%AC%EC%BC%93%EB%AA%AC)");
    }
}
