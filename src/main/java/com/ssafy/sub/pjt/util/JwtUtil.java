package com.ssafy.sub.pjt.util;

import com.ssafy.sub.pjt.domain.MemberTokens;
import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.infrastructure.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final RedisUtil redisUtil;
    private final JwtProvider jwtProvider;

    public MemberTokens createJwtToken(User user) {
        MemberTokens memberTokens = jwtProvider.generateLoginToken(user.getId().toString());
        redisUtil.setData(user.getSocialId(), memberTokens.getRefreshToken());
        return memberTokens;
    }
}
