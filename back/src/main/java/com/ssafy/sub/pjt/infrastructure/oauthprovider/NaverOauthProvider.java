package com.ssafy.sub.pjt.infrastructure.oauthprovider;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.*;

import com.ssafy.sub.pjt.domain.OauthAccessToken;
import com.ssafy.sub.pjt.domain.OauthProvider;
import com.ssafy.sub.pjt.domain.OauthUserInfo;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.infrastructure.oauthuserinfo.NaverUserInfo;
import com.ssafy.sub.pjt.util.RedisUtil;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;

@Component
public class NaverOauthProvider implements OauthProvider {

    @Autowired private RedisUtil redisUtil;

    private static final String PROPERTIES_PATH = "${oauth2.provider.naver.";
    private static final String PROVIDER_NAME = "naver";
    private static final String SECURE_RESOURCE = "secure_resource";

    protected final String clientId;
    protected final String clientSecret;
    protected final String redirectUri;
    protected final String tokenUri;
    protected final String userUri;
    protected final String unLinkUri;

    public NaverOauthProvider(
            @Value(PROPERTIES_PATH + "client-id}") final String clientId,
            @Value(PROPERTIES_PATH + "client-secret}") final String clientSecret,
            @Value(PROPERTIES_PATH + "redirect-uri}") final String redirectUri,
            @Value(PROPERTIES_PATH + "token-uri}") final String tokenUri,
            @Value(PROPERTIES_PATH + "user-info}") final String userUri,
            @Value(PROPERTIES_PATH + "unlink-uri}") final String unLikUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.tokenUri = tokenUri;
        this.userUri = userUri;
        this.unLinkUri = unLikUri;
    }

    @Override
    public boolean is(final String name) {
        return PROVIDER_NAME.equals(name);
    }

    @Override
    public OauthUserInfo getUserInfo(final String code) {
        final String accessToken = requestAccessToken(code);
        final HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        final HttpEntity<MultiValueMap<String, String>> userInfoRequestEntity =
                new HttpEntity<>(headers);

        final ResponseEntity<NaverUserInfo> response =
                restTemplate.exchange(
                        userUri, HttpMethod.GET, userInfoRequestEntity, NaverUserInfo.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            redisUtil.setData(response.getBody().getSocialLoginId() + "_naver", accessToken);
            return response.getBody();
        }

        throw new AuthException(NOT_SUPPORTED_OAUTH_SERVICE);
    }

    @Override
    public void disconnectAccount(String socialId) {

        final HttpHeaders headers = new HttpHeaders();

        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "delete");
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("access_token", redisUtil.getData(socialId + "_naver"));
        params.add("service_provider", "NAVER");

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);

        ResponseEntity<String> entity = null;
        try {
            entity = restTemplate.exchange(unLinkUri, HttpMethod.POST, httpEntity, String.class);
            redisUtil.deleteData(socialId + "_accessToken");
        } catch (HttpStatusCodeException exception) {
            int statusCode = exception.getStatusCode().value();
            throw new AuthException(FAILED_TO_DISCONNECT_SOCIAL);
        }
    }

    private String requestAccessToken(final String code) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        final HttpEntity<MultiValueMap<String, String>> accessTokenRequestEntity =
                new HttpEntity<>(params, headers);

        final ResponseEntity<OauthAccessToken> accessTokenResponse =
                restTemplate.exchange(
                        tokenUri,
                        HttpMethod.POST,
                        accessTokenRequestEntity,
                        OauthAccessToken.class);

        return Optional.ofNullable(accessTokenResponse.getBody())
                .orElseThrow(() -> new AuthException(INVALID_AUTHORIZATION_CODE))
                .getAccessToken();
    }
}
