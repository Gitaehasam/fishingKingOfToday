package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.FishBookListResponse;
import com.ssafy.sub.pjt.service.FishBookService;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/fishbooks")
public class FishBookController {

    private static final String REDIRECT_URL = "/fishbook/%d";

    private final FishBookService fishBookService;

    @GetMapping
    public ResponseEntity<?> getFishBooks() {
        final FishBookListResponse fishBookListResponse = fishBookService.getFish();
        return ResponseEntity.ok().body(fishBookListResponse);
    }

    @GetMapping("/{fishBookId}")
    public ResponseEntity<?> getFishBook(
            @Positive(message = "물고기 ID는 양수만 가능합니다.") @PathVariable final Integer fishBookId) {
        return ResponseEntity.ok().body(fishBookService.searchById(fishBookId));
    }
}
