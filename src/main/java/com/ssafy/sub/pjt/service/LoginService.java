package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.FAIL_TO_GENERATE_RANDOM_NICKNAME;

import com.ssafy.sub.pjt.domain.*;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.exception.AuthException;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private static final int MAX_TRY_COUNT = 5;
    private static final int FOUR_DIGIT_RANGE = 10000;

    // private final RefreshTokenRepository refreshTokenRepository;

    private final OauthProviders oauthProviders;

    private final UserRepository userRepository;

    public User login(final String providerName, final String code) {
        final OauthProvider provider = oauthProviders.mapping(providerName);
        final OauthUserInfo oauthUserInfo = provider.getUserInfo(code);
        final User user =
                findOrCreateMember(
                        oauthUserInfo.getSocialLoginId(),
                        oauthUserInfo.getNickName(),
                        oauthUserInfo.getImageUrl());
        return user;
    }

    private User findOrCreateMember(
            final String socialLoginId, final String nickname, final String imageUrl) {
        return userRepository
                .findBySocialId(socialLoginId)
                .orElseGet(() -> createUser(socialLoginId, nickname, imageUrl));
    }

    public User createUser(
            final String socialLoginId, final String nickname, final String imageUrl) {
        int tryCount = 0;
        while (tryCount < MAX_TRY_COUNT) {
            final String nicknameWithRandomNumber = nickname + generateRandomFourDigitCode();
            if (!userRepository.existsByNickName(nicknameWithRandomNumber)) {
                return userRepository.save(
                        User.builder()
                                .socialId(socialLoginId)
                                .nickName(nicknameWithRandomNumber)
                                .imageUrl(imageUrl)
                                .build());
            }
            tryCount += 1;
        }
        throw new AuthException(FAIL_TO_GENERATE_RANDOM_NICKNAME);
    }

    private String generateRandomFourDigitCode() {
        final int randomNumber = (int) (Math.random() * FOUR_DIGIT_RANGE);
        return String.format("%04d", randomNumber);
    }

    public User findBySocialId(String socialId) {
        return userRepository.findBySocialId(socialId).orElseThrow();
    }
}
