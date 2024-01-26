package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.*;

import com.ssafy.sub.pjt.domain.*;
import com.ssafy.sub.pjt.domain.repository.*;
import com.ssafy.sub.pjt.dto.*;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.exception.BadRequestException;
import java.util.ArrayList;
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
    private final ApplicationEventPublisher publisher;

    public Integer write(BoardRequest boardRequest, String socialId) {
        Board savedBoard = boardRepository.save(createBoard(boardRequest, socialId));
        return savedBoard.getId();
    }

    private Board createBoard(BoardRequest boardRequest, String socialId) {
        final List<HashTag> hashTags = getHashTagList(boardRequest.getHashTags());

        final User user = findUserBySocialId(socialId);

        final Category category =
                categoryRepository
                        .findById(boardRequest.getCategoryId())
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_CATEGORY));

        final FishBook fishBook = findByFishBookId(boardRequest.getFishBookId());

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

        final FishBook fishBook = findByFishBookId(boardUpdateRequest.getFishBookId());

        final List<HashTag> hashTags = getHashTagList(boardUpdateRequest.getHashTags());

        board.updateHashTags(hashTags);
        updateImage(board.getImage().getUrl(), boardUpdateRequest.getImageUrl());
        board.update(boardUpdateRequest, category, fishBook);
    }

    private FishBook findByFishBookId(final Integer fishBookId) {
        if (fishBookId == null) {
            return null;
        }

        final FishBook fishBook =
                fishBookRepository
                        .findById(fishBookId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_FISH));

        return fishBook;
    }

    private List<HashTag> getHashTagList(List<String> hashTagsRequest) {
        if (hashTagsRequest == null) {
            return new ArrayList<>();
        }

        final List<HashTag> hashTags =
                hashTagService.findOrCreateHashTags(new HashTagsRequest(hashTagsRequest));

        return hashTags;
    }

    private void updateImage(final String originalImageName, final String updateImageName) {
        if (originalImageName.equals(updateImageName)) {
            return;
        }
        publisher.publishEvent(new S3ImageEvent(originalImageName));
    }

    @Transactional
    public void delete(String socialId, Integer boardId) {
        User user = findUserBySocialId(socialId);
        Board board = findBoardById(boardId);

        user.delete(board);
        boardRepository.delete(board);
    }

    @Transactional
    public LikeResponse like(String socialId, Integer boardId) {
        User source = findUserBySocialId(socialId);
        Board target = findBoardById(boardId);

        target.like(source);
        return LikeResponse.of(target.getLikeCounts(), true);
    }

    @Transactional
    public LikeResponse unlike(String socialId, Integer boardId) {
        User source = findUserBySocialId(socialId);
        Board target = findBoardById(boardId);

        target.unlike(source);
        return LikeResponse.of(target.getLikeCounts(), false);
    }

    private Board findBoardById(Integer id) {
        return boardRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(NOT_FOUND_BOARD_ID));
    }
}
