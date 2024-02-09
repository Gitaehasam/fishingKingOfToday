package com.ssafy.sub.pjt.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LiveRoomRequest {

    @Size(max = 30)
    @NotBlank(message = "라이브 방송명을 입력하세요.")
    private String name;

    @Size(max = 100)
    private String imageUrl;

    @Size(max = 30)
    @NotBlank(message = "세션 ID가 필요합니다.")
    private String sessionId;
}
