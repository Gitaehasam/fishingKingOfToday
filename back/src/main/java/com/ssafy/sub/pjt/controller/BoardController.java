package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;

import com.ssafy.sub.pjt.domain.HashTag;
import com.ssafy.sub.pjt.dto.*;
import com.ssafy.sub.pjt.service.BoardService;
import com.ssafy.sub.pjt.service.FishBookService;
import com.ssafy.sub.pjt.service.HashTagService;
import java.net.URI;
import java.util.List;
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
    private final HashTagService hashTagService;
    private final FishBookService fishBookService;

    @PostMapping
    public ResponseEntity<Void> write(@RequestBody final BoardRequest request) {
        final Integer postId = boardService.write(request, getCurrentUserSocialId());
        final String redirectUrl = String.format(REDIRECT_URL, postId);

        return ResponseEntity.created(URI.create(redirectUrl)).build();
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> getBoard(@PathVariable final Integer boardId) {
        return ResponseEntity.ok().body(boardService.searchById(boardId));
    }

    @GetMapping
    public ResponseEntity<?> getBoards(
            @RequestParam(required = false, defaultValue = "") final String sortType,
            @RequestParam(required = false, defaultValue = "") final Integer fishBookId,
            @RequestParam(required = false, defaultValue = "") final Integer hashTagId,
            @RequestParam final Integer categoryId,
            final Pageable pageable) {
        final BoardListResponse boardListResponse =
                boardService.getBoardsByPage(pageable, sortType, fishBookId, hashTagId, categoryId);
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

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> delete(@PathVariable Integer boardId) {
        boardService.delete(getCurrentUserSocialId(), boardId);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{boardId}/likes")
    public ResponseEntity<LikeResponse> likeBoard(@PathVariable Integer boardId) {
        LikeResponse likeResponse = boardService.like(getCurrentUserSocialId(), boardId);

        return ResponseEntity.ok(likeResponse);
    }

    @DeleteMapping("/{boardId}/likes")
    public ResponseEntity<LikeResponse> unlikePost(@PathVariable Integer boardId) {
        LikeResponse likeResponse = boardService.unlike(getCurrentUserSocialId(), boardId);

        return ResponseEntity.ok(likeResponse);
    }

    @GetMapping("/hashtags")
    public ResponseEntity<?> findTopFiveHashTags() {
        final List<HashTagResponse> hashtags = hashTagService.findTopFiveHashTags();
        return ResponseEntity.ok().body(hashtags);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getAutoCompleteSearch(@RequestParam final String searchWord) {
        final List<HashTag> hashTagAutoCompleteResponses =
                hashTagService.findAutoCompleteName(searchWord.strip());
        return ResponseEntity.ok().body(hashTagAutoCompleteResponses);
    }

    @GetMapping("/filters")
    public ResponseEntity<?> getFishType() {
        final FishBookFilterListResponse fishBookFilterListResponse =
                fishBookService.getFIshBooksByFishType();
        return ResponseEntity.ok().body(fishBookFilterListResponse);
    }

    @GetMapping("/search/fishBook")
    public ResponseEntity<?> getFishBookAutoCompleteSearch(@RequestParam final String searchWord) {
        final List<FishBookAutoCompleteResponse> fishBookAutoCompleteResponse =
                fishBookService.findAutoCompleteName(searchWord.strip());

        return ResponseEntity.ok().body(fishBookAutoCompleteResponse);
    }
}
