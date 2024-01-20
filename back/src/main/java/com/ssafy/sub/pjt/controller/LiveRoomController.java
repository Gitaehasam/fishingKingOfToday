package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.service.LiveRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lives")
@RequiredArgsConstructor
public class LiveRoomController {

    private final LiveRoomService liveRoomService;

    @GetMapping
    public ResponseEntity<?> getLiveRooms(
            @RequestParam(required = false, defaultValue = "") final String name,
            Pageable pageable) {

        return ResponseEntity.ok().body(liveRoomService.getLiveRooms(name, pageable));
    }
}
