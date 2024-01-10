package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.MyPageRequest;
import com.ssafy.sub.pjt.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PatchMapping("/{userId}")
    public ResponseEntity<?> updateMyInfo(
            @PathVariable final Long userId, @RequestBody final MyPageRequest myPageRequest) {
        userService.updateMyPageInfo(userId, myPageRequest);
        return ResponseEntity.noContent().build();
    }
}
