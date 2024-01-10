package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.ACCOUNT_NOT_FOUND;

import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.MyPageRequest;
import com.ssafy.sub.pjt.exception.BadRequestException;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void updateMyPageInfo(final Long userId, final MyPageRequest myPageRequest) {
        final User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new BadRequestException(ACCOUNT_NOT_FOUND));

        final User updateUser =
                User.builder()
                        .id(userId)
                        .name(user.getName())
                        .socialId(user.getSocialId())
                        .platform(user.getPlatform())
                        .nickName(myPageRequest.getNickname())
                        .imageUrl(myPageRequest.getImageUrl())
                        .joinAt(user.getJoinAt())
                        .lastLoginAt(user.getLastLoginAt())
                        .build();

        // deleteOriginalImage(member.getImageUrl(), updateMember.getImageUrl());
        userRepository.save(updateUser);
    }
}
