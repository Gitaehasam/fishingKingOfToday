package com.ssafy.sub.pjt.infrastructure.oauthuserinfo;

import static lombok.AccessLevel.PRIVATE;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.sub.pjt.domain.OauthUserInfo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = PRIVATE)
@AllArgsConstructor
public class NaverUserInfo implements OauthUserInfo {
    @JsonProperty("id")
    private String socialLoginId;

    @JsonProperty("naver_account")
    private NaverAccount naverAccount;

    @Override
    public String getSocialLoginId() {
        return socialLoginId;
    }

    @Override
    public String getNickName() {
        return naverAccount.naverProfile.nickname;
    }

    @Override
    public String getImageUrl() {
        return naverAccount.naverProfile.image;
    }

    @NoArgsConstructor(access = PRIVATE)
    private static class NaverAccount {

        @JsonProperty("profile")
        private NaverUserInfo.NaverProfile naverProfile;
    }

    @NoArgsConstructor(access = PRIVATE)
    private static class NaverProfile {

        @JsonProperty("nickname")
        private String nickname;

        @JsonProperty("profile_image_url")
        private String image;
    }
}
