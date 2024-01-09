package com.ssafy.sub.pjt.util;

import com.ssafy.sub.pjt.exception.UnAuthorizedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.UnsupportedEncodingException;
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
public class JWTUtil {
    @Value("${jwt.salt}")
    private String salt;

    @Value("${jwt.access-token.expiretime}")
    private long accessTokenExpireTiem;

    @Value("${jwt.refresh-token.expiretime}")
    private long refreshTokenExpireTime;

    private final UserDetailsService userDetailsService;

    public JWTUtil(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public String createAccessToken(String userId) {
        return create(userId, "access-token", accessTokenExpireTiem);
    }

    //	AccessToken에 비해 유효기간을 길게 설정.
    public String createRefreshToken(String userId) {
        return create(userId, "refresh-token", refreshTokenExpireTime);
    }

    /**
     * Token 발급
     *
     * @param userId
     * @param subject : payload에 sub의 value로 들어갈 subject 값
     * @param expireTime : 토큰 유효기간 설정을 위한 값
     * @return jwt jwt 토큰의 구성: header + payload + signature
     */
    private String create(String userId, String subject, long expireTime) {
        // Payload 설정: 생성일 (IssuedAt), 유효기간 (Expiration), 토큰 제목(Subject), 데이터(Claim) 등 정보 세팅
        Claims claims =
                Jwts.claims()
                        .setSubject(subject) // 토큰 제목 설정 ex) access-token, refresh-token
                        .setIssuedAt(new Date()) // 생성일 설정
                        .setExpiration(
                                new Date(System.currentTimeMillis() + expireTime)); // 만료일 설정 (유효기간)

        // 저장할 data의 key, value
        claims.put("userId", userId);

        String jwt =
                Jwts.builder()
                        .setHeaderParam("typ", "JWT")
                        .setClaims(claims) // Header 설정: 토큰의 타입, 해쉬 알고리즘 정보 세팅.
                        .signWith(
                                SignatureAlgorithm.HS256,
                                this.generateKey()) // signature 설정: secret key를 활용한 암호화.
                        .compact(); // 직렬화 처리
        return jwt;
    }

    /**
     * Signature 설정에 들어갈 key 생성
     *
     * @return key
     */
    private byte[] generateKey() {
        byte[] key = null;
        try {
            key = salt.getBytes("UTF-8"); // 설정 안 하면, 사용자 플랫폼의 기본 인코딩 설정으로 인코딩 된다.
        } catch (UnsupportedEncodingException e) {
            if (log.isInfoEnabled()) {
                e.printStackTrace();
            } else {
                log.error("Making JWT Key Error ::: {}", e.getMessage());
            }
        }
        return key;
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
                    Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(token);
            log.debug("claims: {}", claims);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public String getUserId(String authorization) {
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser().setSigningKey(this.generateKey()).parseClaimsJws(authorization);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new UnAuthorizedException();
        }
        Map<String, Object> value = claims.getBody();
        log.info("value: {}", value);
        return (String) value.get("userId");
    }

    public String resolveToken(HttpServletRequest req) {
        return req.getHeader("AUTHORIZATION");
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserId(token));
        return new UsernamePasswordAuthenticationToken(
                userDetails, "", userDetails.getAuthorities());
    }
}
