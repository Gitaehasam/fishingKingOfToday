package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;

import com.ssafy.sub.pjt.dto.BoardRequest;
import com.ssafy.sub.pjt.service.BoardService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {

    private static final String REDIRECT_URL = "/boards/%d";

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<Void> write(@RequestBody BoardRequest request) {
        Integer postId = boardService.write(request, getCurrentUserSocialId());
        String redirectUrl = String.format(REDIRECT_URL, postId);

        return ResponseEntity.created(URI.create(redirectUrl)).build();
    }
}
