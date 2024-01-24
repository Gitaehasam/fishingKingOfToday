package com.ssafy.sub.pjt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LiveRoomUpdateRequest {
    private String name;
    private Boolean isActive;
    private String imageUrl;
}
