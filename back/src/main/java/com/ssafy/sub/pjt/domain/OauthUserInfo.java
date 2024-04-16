package com.ssafy.sub.pjt.domain;

public interface OauthUserInfo {
    String getSocialLoginId();

    String getNickName(); // name이 필요하고, nickname은 우리가 만들건데?!

    String getImageUrl();
}
