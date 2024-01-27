package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.FishBookListResponse;
import com.ssafy.sub.pjt.service.FishBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fishbooks")
public class FishBookController {

    private static final String REDIRECT_URL = "/fishbook/%d";

    private final FishBookService fishBookService;

    @GetMapping
    public ResponseEntity<?> getFishBooks(final Pageable pageable) {
        final FishBookListResponse fishBookListResponse =
                fishBookService.getFishBooksByPage(pageable);
        return ResponseEntity.ok().body(fishBookListResponse);
    }
}
