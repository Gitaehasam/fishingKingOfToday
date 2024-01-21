package com.ssafy.sub.pjt.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;


import static lombok.AccessLevel.PRIVATE;

@Getter
@NoArgsConstructor
public class LiveRoomRequest {
    private String name;
    private String imageUrl;
}
