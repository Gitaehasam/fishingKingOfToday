package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.LiveRoom;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class LiveRoomResponse {
    private final Integer liveRoomId;
    private final String name;
    private final String imageUrl;
    private final Boolean isActive;
    private final LocalDateTime createdAt;
    private final String nickName;
    private final String sessionId;

    public static LiveRoomResponse of(final LiveRoom liveRoom) {
        return new LiveRoomResponse(
                liveRoom.getId(),
                liveRoom.getName(),
                liveRoom.getImageUrl(),
                liveRoom.getIsActive(),
                liveRoom.getCreatedAt(),
                liveRoom.getUser().getNickName(),
                liveRoom.getSessionId());
    }
}
