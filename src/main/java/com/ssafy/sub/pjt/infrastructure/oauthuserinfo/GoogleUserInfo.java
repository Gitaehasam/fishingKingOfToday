package com.ssafy.sub.pjt.infrastructure.oauthuserinfo;

import static lombok.AccessLevel.PRIVATE;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.sub.pjt.domain.OauthUserInfo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = PRIVATE)
@AllArgsConstructor
public class GoogleUserInfo implements OauthUserInfo {

    @JsonProperty("id")
    private String socialLoginId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("picture")
    private String picture;

    public String getSocialLoginId() {
        return socialLoginId;
    }

    @Override
    public String getNickName() {
        return name;
    }

    @Override
    public String getImageUrl() {
        return picture;
    }
}
