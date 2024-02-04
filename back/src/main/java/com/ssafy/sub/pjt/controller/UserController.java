package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.MyPageRequest;
import com.ssafy.sub.pjt.dto.MyPageResponse;
import com.ssafy.sub.pjt.service.UserService;
import com.ssafy.sub.pjt.util.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<MyPageResponse> getMyInfo() {
        final MyPageResponse myPageResponse =
                userService.getMyPageInfo(AuthenticationUtil.getCurrentUserSocialId());
        return ResponseEntity.ok().body(myPageResponse);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getMyInfo(
            @PathVariable final Integer userId, @RequestBody final MyPageRequest myPageRequest) {
        userService.updateMyPageInfo(userId, myPageRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteAccount(@PathVariable final Long userId) {
        userService.deleteAccount(AuthenticationUtil.getCurrentUserSocialId());
        return ResponseEntity.noContent().build();
    }
}
