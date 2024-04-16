package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_MEMBER_ID;

import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.domain.repository.BoardRepository;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.MyFishListResponse;
import com.ssafy.sub.pjt.dto.MyFishResponse;
import com.ssafy.sub.pjt.exception.AuthException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AquariumService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public MyFishListResponse getMyFish(final String socialId) {
        final User user = findUserBySocialId(socialId);
        final List<Integer> boards = boardRepository.findFishbookByUserId(user.getId());

        final List<MyFishResponse> myFishResponses =
                boards.stream()
                        .map(
                                board ->
                                        MyFishResponse.of(
                                                board,
                                                boardRepository.findCreatedAtByUserIdAndFishBookId(
                                                        user.getId(), board)))
                        .collect(Collectors.toList());

        return new MyFishListResponse(myFishResponses);
    }

    private User findUserBySocialId(String socialId) {
        return userRepository
                .findBySocialId(socialId)
                .orElseThrow(() -> new AuthException(NOT_FOUND_MEMBER_ID));
    }
}
