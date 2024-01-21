package com.ssafy.sub.pjt.service;

import com.ssafy.sub.pjt.domain.LiveRoom;
import com.ssafy.sub.pjt.domain.repository.LiveRoomRepository;
import com.ssafy.sub.pjt.dto.LiveRoomListResponse;
import com.ssafy.sub.pjt.dto.LiveRoomRequest;
import com.ssafy.sub.pjt.dto.LiveRoomResponse;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LiveRoomService {

    private final LiveRoomRepository liveRoomRepository;

    public int createBy(LiveRoomRequest liveRoomRequest) {

        try {
//            Long foundUserId = getUserBy(phoneNumber).getId();
            LiveRoom savedLiveRoom = createAuctionRoom(liveRoomRequest);

            return savedLiveRoom.getId();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    private LiveRoom createAuctionRoom(LiveRoomRequest liveRoomRequest) {
        LiveRoom liveRoom = LiveRoom.builder()
                .ownerId(liveRoomResponse.getOwnerId())
                .auctionRoomTitle(liveRoomRequest.getName())
                .image(liveRoomRequest.getImageUrl())
                .isActive(false)
                .build();

        return liveRoomRepository.save(liveRoom);
    }

    @Transactional(readOnly = true)
    public LiveRoomListResponse getLiveRooms(String name, Pageable pageable) {
        Slice<LiveRoom> liveRooms = liveRoomRepository.findBySearchCondition(name, pageable);
        return new LiveRoomListResponse(
                liveRooms.stream()
                        .map(liveRoom -> LiveRoomResponse.of(liveRoom))
                        .collect(Collectors.toList()),
                liveRooms.hasNext());
    }
}
