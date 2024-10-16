package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.FAIL_TO_GENERATE_RANDOM_NICKNAME;
import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_MEMBER_ID;

import com.ssafy.sub.pjt.domain.*;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.util.RandomNicknameUtil;
import com.ssafy.sub.pjt.util.RedisUtil;
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
    private final RedisUtil redisUtil;

    public User login(final String providerName, final String code) {
        final OauthProvider provider = oauthProviders.mapping(providerName);
        final OauthUserInfo oauthUserInfo = provider.getUserInfo(code);
        final User user =
                findOrCreateMember(
                        providerName,
                        oauthUserInfo.getSocialLoginId(),
                        oauthUserInfo.getNickName(),
                        oauthUserInfo.getImageUrl());
        return user;
    }

    public void logout(String socialId) {
        redisUtil.deleteData(socialId);
    }

    private User findOrCreateMember(
            final String providerName,
            final String socialLoginId,
            final String nickname,
            final String imageUrl) {
        return userRepository
                .findBySocialId(socialLoginId)
                .orElseGet(() -> createUser(providerName, socialLoginId, nickname, imageUrl));
    }

    public User createUser(
            final String providerName,
            final String socialLoginId,
            final String nickname,
            final String imageUrl) {
        int tryCount = 0;
        while (tryCount < MAX_TRY_COUNT) {
            final String nicknameWithRandom = RandomNicknameUtil.getRamdomNinkname();
            if (!userRepository.existsByNickName(nicknameWithRandom)) {
                return userRepository.save(
                        User.builder()
                                .socialId(socialLoginId)
                                .name(nickname)
                                .nickName(nicknameWithRandom)
                                .imageUrl(imageUrl)
                                .platform(providerName)
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
        return userRepository
                .findBySocialId(socialId)
                .orElseThrow(() -> new AuthException(NOT_FOUND_MEMBER_ID));
    }
}
