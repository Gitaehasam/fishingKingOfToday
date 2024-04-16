package com.ssafy.sub.pjt.infrastructure;

import com.ssafy.sub.pjt.domain.MemberTokens;
import com.ssafy.sub.pjt.exception.UnAuthorizedException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtProvider {

    public static final String EMPTY_SUBJECT = "";

    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.access-expiration-time}")
    private Long accessExpirationTime;

    @Value("${security.jwt.refresh-expiration-time}")
    private Long refreshExpirationTime;

    private final UserDetailsService userDetailsService;

    public JwtProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public MemberTokens generateLoginToken(final String socialId, final String subject) {
        final String refreshToken = createToken(socialId, EMPTY_SUBJECT, refreshExpirationTime);
        final String accessToken = createToken(socialId, subject, accessExpirationTime);
        return new MemberTokens(refreshToken, accessToken);
    }

    private String createToken(
            final String socialId, final String subject, final Long validityInMilliseconds) {
        final Date now = new Date();
        final Date validity = new Date(now.getTime() + validityInMilliseconds);

        Claims claims = Jwts.claims();

        claims.put("userId", socialId);

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String resolveToken(HttpServletRequest req) {
        return req.getHeader("AUTHORIZATION");
    }

    /**
     * 전달 받은 토큰이 제대로 생성된 것인지 확인하고 문제가 있다면 UnauthorizedException을 발생시킨다.
     *
     * @param token
     * @return
     */
    public boolean checkToken(String token) {
        try {
            // Json Web Signature: 서버에서 인증을 근거로 인증정보를 서버의 private key로 서명한 것을 토큰화한 것
            // setSigningKey : JWS 서명 검증을 위한 secret key 세팅
            // parseClaimsJws : 파싱하여 원본 jws 만들기
            Jws<Claims> claims =
                    Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            log.debug("claims: {}", claims);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserId(token));
        return new UsernamePasswordAuthenticationToken(
                userDetails, "", userDetails.getAuthorities());
    }

    public String getUserId(String authorization) {
        Jws<Claims> claims = null;
        try {
            claims =
                    Jwts.parserBuilder()
                            .setSigningKey(secretKey)
                            .build()
                            .parseClaimsJws(authorization);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UnAuthorizedException();
        }
        Map<String, Object> value = claims.getBody();
        log.info("value: {}", value);
        return (String) value.get("userId");
    }

    private Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
