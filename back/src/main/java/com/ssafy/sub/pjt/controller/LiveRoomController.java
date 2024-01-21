package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.LiveRoomRequest;
import com.ssafy.sub.pjt.service.LiveRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/lives")
@RequiredArgsConstructor
public class LiveRoomController {

    private final LiveRoomService liveRoomService;

    @PostMapping("/create-room/")
    public ResponseEntity<HashMap<String, Object>> createRoom(@RequestBody LiveRoomRequest liveRoomRequest){
        HashMap<String, Object> jsonMap = new HashMap<>();
        int liveRoomId = liveRoomService.createBy(liveRoomRequest);

        if(liveRoomId > 0) jsonMap.put("LiveRoomId", liveRoomId);
        else jsonMap.put("isSuccess", false);

        return ResponseEntity.ok(jsonMap);
    }

    @GetMapping
    public ResponseEntity<?> getLiveRooms(
            @RequestParam(required = false, defaultValue = "") final String name,
            Pageable pageable) {

        return ResponseEntity.ok().body(liveRoomService.getLiveRooms(name, pageable));
    }
}
