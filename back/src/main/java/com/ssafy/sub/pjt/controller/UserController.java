package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;

import com.ssafy.sub.pjt.dto.*;
import com.ssafy.sub.pjt.service.BoardService;
import com.ssafy.sub.pjt.service.UserService;
import com.ssafy.sub.pjt.util.AuthenticationUtil;
import javax.validation.Valid;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final BoardService boardService;

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

    @GetMapping("/myfish")
    public ResponseEntity<?> getMyFish(final Pageable pageable) {
        final MyFishListResponse myFishListResponse =
                boardService.getMyFishByPage(pageable, getCurrentUserSocialId());
        return ResponseEntity.ok().body(myFishListResponse);
    }

    @GetMapping("/boards")
    @Operation(summary = "카테고리에 따라 내 게시글 모아보기 API", description = "categoryId = 1(물고기) | 2(장소)")
    public ResponseEntity<?> getMyBoards(@RequestParam final Integer categoryId) {
        return ResponseEntity.ok()
                .body(boardService.getMyBoards(getCurrentUserSocialId(), categoryId));
    }
}
