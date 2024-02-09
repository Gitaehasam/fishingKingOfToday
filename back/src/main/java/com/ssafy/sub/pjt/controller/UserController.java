package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;

import com.ssafy.sub.pjt.dto.MyPageRequest;
import com.ssafy.sub.pjt.dto.MyPageResponse;
import com.ssafy.sub.pjt.service.UserService;
import com.ssafy.sub.pjt.util.AuthenticationUtil;
import javax.validation.Valid;
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
        final MyPageResponse myPageResponse = userService.getMyPageInfo(getCurrentUserSocialId());
        return ResponseEntity.ok().body(myPageResponse);
    }

    @PutMapping
    public ResponseEntity<?> updateMyInfo(@RequestBody @Valid final MyPageRequest myPageRequest) {
        userService.updateMyPageInfo(getCurrentUserSocialId(), myPageRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAccount() {
        userService.deleteAccount(AuthenticationUtil.getCurrentUserSocialId());
        return ResponseEntity.noContent().build();
    }
}
