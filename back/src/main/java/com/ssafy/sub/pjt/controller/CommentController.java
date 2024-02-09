package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;

import com.ssafy.sub.pjt.dto.CommentRequest;
import com.ssafy.sub.pjt.dto.CommentResponse;
import com.ssafy.sub.pjt.service.CommentService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/boards/{boardId}/comments")
    public ResponseEntity<CommentResponse> addComment(
            @PathVariable Integer boardId, @RequestBody @Valid CommentRequest request) {
        CommentResponse commentResponse =
                commentService.addComment(request, boardId, getCurrentUserSocialId());

        return ResponseEntity.ok(commentResponse);
    }

    @DeleteMapping("/boards/{boardId}/comments/{commentId}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer boardId, @PathVariable Integer commentId) {
        commentService.delete(getCurrentUserSocialId(), boardId, commentId);

        return ResponseEntity.noContent().build();
    }
}
