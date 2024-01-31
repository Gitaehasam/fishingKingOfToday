package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.FishingSpotListResponse;
import com.ssafy.sub.pjt.service.FishingSpotService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/spots")
public class FishingSpotController {

    private final FishingSpotService fishingSpotService;

    @GetMapping
    public ResponseEntity<?> getSpots(
            // @RequestParam(required = false, defaultValue = "") final String sortType,
            // @RequestParam(required = false, defaultValue = "") final Integer fishBookId,
            @RequestParam(required = false, defaultValue = "") final String spotType,
            @RequestParam(required = false, defaultValue = "") final String sido,
            @RequestParam(required = false, defaultValue = "") final String keyword,
            @RequestParam(required = false, defaultValue = "") final Float latitude,
            @RequestParam(required = false, defaultValue = "") final Float longitude,
            @RequestParam(required = false, defaultValue = "") final Integer hashTagId,
            final Pageable pageable) {
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
}
