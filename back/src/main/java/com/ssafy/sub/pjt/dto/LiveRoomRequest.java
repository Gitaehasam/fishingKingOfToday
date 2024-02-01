package com.ssafy.sub.pjt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LiveRoomRequest {
    private String name;
    private String imageUrl;
    private String sessionId;
}
