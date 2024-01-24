package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.LiveRoomCreatedResponse;
import com.ssafy.sub.pjt.dto.LiveRoomRequest;
import com.ssafy.sub.pjt.dto.LiveRoomUpdateRequest;
import com.ssafy.sub.pjt.service.LiveRoomService;
import com.ssafy.sub.pjt.util.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lives")
@RequiredArgsConstructor
public class LiveRoomController {

    private final LiveRoomService liveRoomService;

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody LiveRoomRequest liveRoomRequest) {

        LiveRoomCreatedResponse liveRoomCreatedResponse =
                liveRoomService.createBy(
                        liveRoomRequest, AuthenticationUtil.getCurrentUserSocialId());

        return ResponseEntity.ok(liveRoomCreatedResponse);
    }

    @GetMapping
    public ResponseEntity<?> getLiveRooms(
            @RequestParam(required = false, defaultValue = "") final String name,
            Pageable pageable) {

        return ResponseEntity.ok().body(liveRoomService.getLiveRooms(name, pageable));
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<?> modifyRoom(
            @PathVariable final Integer roomId,
            @RequestBody LiveRoomUpdateRequest liveRoomUpdateRequest) {

        liveRoomService.updateLiveRoom(roomId, liveRoomUpdateRequest);
        return ResponseEntity.noContent().build();
    }
}
