package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.*;

import com.ssafy.sub.pjt.domain.*;
import com.ssafy.sub.pjt.domain.repository.*;
import com.ssafy.sub.pjt.dto.*;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.exception.BadRequestException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final HashTagService hashTagService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final FishBookRepository fishBookRepository;
    private final CommentRepository commentRepository;
    private final ApplicationEventPublisher publisher;

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

    @Transactional(readOnly = true)
    public BoardListResponse getBoardsByPage(final Pageable pageable) {
        final Slice<Board> boards = boardRepository.findBoardByPageable(pageable.previousOrFirst());
        final List<BoardResponse> boardResponses =
                boards.stream()
                        .map(
                                board ->
                                        BoardResponse.of(
                                                board,
                                                board.getComments().size(),
                                                board.getLikes().size()))
                        .collect(Collectors.toList());
        return new BoardListResponse(boardResponses, boards.hasNext());
    }

    public void validateBoardByUser(final String socialId, final Integer boardId) {
        if (!boardRepository.existsByUserSocialIdAndId(socialId, boardId)) {
            throw new AuthException(INVALID_BOARD_WITH_USER);
        }
    }

    @Transactional
    public void update(final Integer boardId, final BoardUpdateRequest boardUpdateRequest) {
        final Board board =
                boardRepository
                        .findById(boardId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_BOARD_ID));

        final Category category =
                categoryRepository
                        .findById(boardUpdateRequest.getCategoryId())
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_CATEGORY));

        final FishBook fishBook =
                fishBookRepository
                        .findById(boardUpdateRequest.getFishBookId())
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_FISH));

        final List<HashTag> hashTags =
                hashTagService.findOrCreateHashTags(
                        new HashTagsRequest(boardUpdateRequest.getHashTags()));

        board.updateHashTags(hashTags);
        updateImage(board.getImage().getUrl(), boardUpdateRequest.getImageUrl());
        board.update(boardUpdateRequest, category, fishBook);

        // boardRepository.save(board);
    }

    private void updateImage(final String originalImageName, final String updateImageName) {
        if (originalImageName.equals(updateImageName)) {
            return;
        }
        publisher.publishEvent(new S3ImageEvent(originalImageName));
    }
}
