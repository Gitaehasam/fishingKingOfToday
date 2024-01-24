package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.*;

import com.ssafy.sub.pjt.domain.*;
import com.ssafy.sub.pjt.domain.repository.BoardRepository;
import com.ssafy.sub.pjt.domain.repository.CategoryRepository;
import com.ssafy.sub.pjt.domain.repository.FishBookRepository;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.BoardRequest;
import com.ssafy.sub.pjt.dto.HashTagsRequest;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.exception.BadRequestException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final HashTagService hashTagService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final FishBookRepository fishBookRepository;

    public Integer write(BoardRequest boardRequest, String socialId) {
        Board savedBoard = boardRepository.save(createBoard(boardRequest, socialId));
        return savedBoard.getId();
    }

    private Board createBoard(BoardRequest boardRequest, String socialId) {
        final List<HashTag> hashTags =
                hashTagService.findOrCreateHashTags(
                        new HashTagsRequest(boardRequest.getHashTags()));

        final User user = findUserBySocialId(socialId);

        final Category category =
                categoryRepository
                        .findById(boardRequest.getCategoryId())
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_CATEGORY));

        final FishBook fishBook =
                fishBookRepository
                        .findById(boardRequest.getFishBookId())
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_FISH));

        final Board board = Board.of(user, category, fishBook, boardRequest);
        board.addHashTags(hashTags);

        return board;
    }

    private User findUserBySocialId(String socialId) {
        return userRepository
                .findBySocialId(socialId)
                .orElseThrow(() -> new AuthException(NOT_FOUND_MEMBER_ID));
    }
}
