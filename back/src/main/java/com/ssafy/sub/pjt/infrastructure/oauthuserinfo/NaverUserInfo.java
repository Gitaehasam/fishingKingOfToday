package com.ssafy.sub.pjt.infrastructure.oauthuserinfo;

import static lombok.AccessLevel.PRIVATE;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.sub.pjt.domain.OauthUserInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = PRIVATE)
public class NaverUserInfo implements OauthUserInfo {

    @JsonProperty("response")
    private Response response;

    @Getter
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Response {
        private String id;
        private String profile_image;
        private String name;
    }

    @Override
    public String getSocialLoginId() {
        return response.id;
    }

    @Override
    public String getNickName() {
        return response.name;
    }

    @Override
    public String getImageUrl() {
        return response.profile_image;
    }
}
