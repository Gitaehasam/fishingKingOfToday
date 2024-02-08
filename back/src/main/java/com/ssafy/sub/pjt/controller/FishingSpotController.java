package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.domain.repository.FishingSpotRepository;
import com.ssafy.sub.pjt.dto.FishingSpotListResponse;
import com.ssafy.sub.pjt.service.FishingSpotService;
import com.ssafy.sub.pjt.service.HashTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spots")
public class FishingSpotController {

    private final FishingSpotService fishingSpotService;
    private final HashTagService hashTagService;
    private final FishingSpotRepository fishingSpotRepository;

    @GetMapping
    public ResponseEntity<?> getSpots(
            // @RequestParam(required = false, defaultValue = "") final String sortType,
            // @RequestParam(required = false, defaultValue = "") final Integer fishBookId,
            @RequestParam(required = false, defaultValue = "") final String spotType,
            @RequestParam(required = false, defaultValue = "") final String sido,
            @RequestParam(required = false, defaultValue = "") final String keyword,
            @RequestParam(required = false, defaultValue = "") final Float latitude,
            @RequestParam(required = false, defaultValue = "") final Float longitude,
            @RequestParam(required = false, defaultValue = "") Integer hashTagId,
            final Pageable pageable) {
        if (!keyword.isEmpty() && keyword.charAt(0) == '#' && hashTagId == null) {
            final FishingSpotListResponse fishingSpotListResponse =
                    fishingSpotService.getSpotsByHashTag(pageable, keyword);
            return ResponseEntity.ok().body(fishingSpotListResponse);
        }
        final FishingSpotListResponse fishingSpotListResponse =
                fishingSpotService.getSpotsByPage(
                        pageable,
                        // sortType,
                        // fishBookId,
                        spotType,
                        sido,
                        keyword,
                        hashTagId,
                        latitude,
                        longitude);
        return ResponseEntity.ok().body(fishingSpotListResponse);
    }

    @GetMapping("/{fishingSpotId}")
    public ResponseEntity<?> getFishingSpotById(@PathVariable final Integer fishingSpotId) {
        final Integer categoryId = 2; // 2번이 낚시터 카테고리
        return ResponseEntity.ok().body(fishingSpotService.searchById(fishingSpotId, categoryId));
    }
}
