package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_AUTHENTICATED_ACCOUNT;
import static com.ssafy.sub.pjt.common.CustomExceptionStatus.REQUEST_ERROR;

import com.ssafy.sub.pjt.domain.LiveRoom;
import com.ssafy.sub.pjt.domain.repository.LiveRoomRepository;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.*;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.exception.BadRequestException;
import com.ssafy.sub.pjt.util.AuthenticationUtil;
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
    private final UserRepository uerRepository;

    //    public void validateCreateLiveRoomByUser(String socialId) {
    //        if (!uerRepository.existsBySocialId(socialId)) {
    //            throw new AuthException(NOT_AUTHENTICATED_ACCOUNT);
    //        }
    //    }

    public LiveRoomCreatedResponse createBy(
            LiveRoomRequest liveRoomRequest, String currentSocialId) {
        // validateCreateLiveRoomByUser(currentSocialId);
        if (!uerRepository.existsBySocialId(currentSocialId)) {
            throw new AuthException(NOT_AUTHENTICATED_ACCOUNT);
        }

        LiveRoom liveRoom =
                LiveRoom.builder()
                        .ownerId(
                                uerRepository
                                        .findBySocialId(AuthenticationUtil.getCurrentUserSocialId())
                                        .get())
                        .name(liveRoomRequest.getName())
                        .imageUrl(liveRoomRequest.getImageUrl())
                        .isActive(false)
                        .build();

        LiveRoom savedLiveRoom = liveRoomRepository.save(liveRoom);

        return new LiveRoomCreatedResponse(savedLiveRoom.getId());
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

    public void updateLiveRoom(
            final Integer roomId, final LiveRoomUpdateRequest liveRoomUpdateRequest) {
        final LiveRoom liveRoom =
                liveRoomRepository
                        .findById(roomId)
                        .orElseThrow(() -> new BadRequestException(REQUEST_ERROR));
        // 에러코드 추가 규칙을 몰라서 임시로 리퀘스트 에러 가져다 씀
        final LiveRoom updateLiveRoom =
                LiveRoom.builder()
                        .id(roomId)
                        .name(liveRoomUpdateRequest.getName())
                        .isActive(liveRoomUpdateRequest.getIsActive())
                        .ownerId(liveRoom.getOwnerId())
                        // .joinAt(user.getJoinAt())
                        // .lastLoginAt(user.getLastLoginAt())
                        .imageUrl(liveRoomUpdateRequest.getImageUrl())
                        .build();

        // deleteOriginalImage(member.getImageUrl(), updateMember.getImageUrl());
        liveRoomRepository.save(updateLiveRoom);
    }
}
