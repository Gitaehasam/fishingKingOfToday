package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.*;

import com.ssafy.sub.pjt.domain.OauthProvider;
import com.ssafy.sub.pjt.domain.OauthProviders;
import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.MyPageRequest;
import com.ssafy.sub.pjt.dto.MyPageResponse;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final OauthProviders oauthProviders;

    @Transactional(readOnly = true)
    public MyPageResponse getMyPageInfo(final String socialId) {
        final User user =
                userRepository
                        .findBySocialId(socialId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_MEMBER_ID));
        return MyPageResponse.from(user);
    }

    public void updateMyPageInfo(final String socialId, final MyPageRequest myPageRequest) {
        final User user =
                userRepository
                        .findBySocialId(socialId)
                        .orElseThrow(() -> new BadRequestException(ACCOUNT_NOT_FOUND));

        user.updateNickName(myPageRequest.getNickname());
        user.updateImageUrl(myPageRequest.getImageUrl());

        //        final User updateUser =
        //                User.builder()
        //                        .id(user.getId())
        //                        .name(user.getName())
        //                        .socialId(user.getSocialId())
        //                        .platform(user.getPlatform())
        //                        .nickName(myPageRequest.getNickname())
        //                        .imageUrl(myPageRequest.getImageUrl())
        //                        // .joinAt(user.getJoinAt())
        //                        // .lastLoginAt(user.getLastLoginAt())
        //                        .build();

        // deleteOriginalImage(member.getImageUrl(), updateMember.getImageUrl());
        // userRepository.save(updateUser);
    }

    @Transactional
    public void deleteAccount(final String socialId) {
        // final List<Long> tripIds = customTripRepository.findTripIdsByMemberId(memberId);
        // publishedTripRepository.deleteByTripIds(tripIds);
        // sharedTripRepository.deleteByTripIds(tripIds);
        User user =
                userRepository
                        .findBySocialId(socialId)
                        .orElseThrow(() -> new AuthException(ACCOUNT_NOT_FOUND));
        final OauthProvider provider = oauthProviders.mapping(user.getPlatform());
        provider.disconnectAccount(socialId);
        userRepository.deleteBySocialId(socialId);

        // publisher.publishEvent(new MemberDeleteEvent(tripIds, memberId));
    }
}
