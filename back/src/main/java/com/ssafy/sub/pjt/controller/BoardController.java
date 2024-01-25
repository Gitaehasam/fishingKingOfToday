package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;

import com.ssafy.sub.pjt.dto.BoardListResponse;
import com.ssafy.sub.pjt.dto.BoardRequest;
import com.ssafy.sub.pjt.dto.BoardUpdateRequest;
import com.ssafy.sub.pjt.service.BoardService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {

    private static final String REDIRECT_URL = "/boards/%d";

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<Void> write(@RequestBody final BoardRequest request) {
        final Integer postId = boardService.write(request, getCurrentUserSocialId());
        final String redirectUrl = String.format(REDIRECT_URL, postId);

        return ResponseEntity.created(URI.create(redirectUrl)).build();
    }

    @GetMapping
    public ResponseEntity<?> getBoards(final Pageable pageable) {
        final BoardListResponse boardListResponse = boardService.getBoardsByPage(pageable);
        return ResponseEntity.ok().body(boardListResponse);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<?> update(
            @PathVariable final Integer boardId,
            @RequestBody final BoardUpdateRequest boardUpdateRequest) {
        boardService.validateBoardByUser(getCurrentUserSocialId(), boardId);
        boardService.update(boardId, boardUpdateRequest);
        return ResponseEntity.noContent().build();
    }
}
