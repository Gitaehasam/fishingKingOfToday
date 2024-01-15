package com.ssafy.sub.pjt.controller;

import static org.springframework.http.HttpHeaders.SET_COOKIE;
import static org.springframework.http.HttpStatus.CREATED;

import com.ssafy.sub.pjt.domain.MemberTokens;
import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.dto.AccessTokenResponse;
import com.ssafy.sub.pjt.dto.LoginRequest;
import com.ssafy.sub.pjt.service.LoginService;
import com.ssafy.sub.pjt.util.JwtUtil;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    public static final int COOKIE_AGE_SECONDS = 604800;

    private final LoginService loginService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login/{provider}")
    public ResponseEntity<AccessTokenResponse> login(
            @PathVariable final String provider,
            @RequestBody final LoginRequest loginRequest,
            final HttpServletResponse response) {
        final User user = loginService.login(provider, loginRequest.getCode());
        final MemberTokens memberTokens = jwtUtil.createJwtToken(user);
        final ResponseCookie cookie =
                ResponseCookie.from("refresh-token", memberTokens.getRefreshToken())
                        .maxAge(COOKIE_AGE_SECONDS)
                        .sameSite("None")
                        .secure(true)
                        .httpOnly(true)
                        .path("/")
                        .build();
        response.addHeader(SET_COOKIE, cookie.toString());
        return ResponseEntity.status(CREATED)
                .body(new AccessTokenResponse(memberTokens.getAccessToken()));
    }
}
