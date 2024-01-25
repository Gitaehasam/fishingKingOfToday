package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_BOARD_ID;
import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_MEMBER_ID;

import com.ssafy.sub.pjt.domain.Board;
import com.ssafy.sub.pjt.domain.Comment;
import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.domain.repository.BoardRepository;
import com.ssafy.sub.pjt.domain.repository.CommentRepository;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.CommentRequest;
import com.ssafy.sub.pjt.dto.CommentResponse;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public CommentResponse addComment(
            CommentRequest commentRequest, Integer boardId, String socialId) {
        String content = commentRequest.getContent();
        User user = findUserBySocialId(socialId);
        Board board = findBoardById(boardId);

        Comment comment =
                Comment.builder()
                        .content(commentRequest.getContent())
                        .user(user)
                        .board(board)
                        .build();
        Comment savedComment = commentRepository.save(comment);

        return CommentResponse.of(comment, user);
    }

    private User findUserBySocialId(String socialId) {
        return userRepository
                .findBySocialId(socialId)
                .orElseThrow(() -> new AuthException(NOT_FOUND_MEMBER_ID));
    }

    private Board findBoardById(Integer id) {
        return boardRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(NOT_FOUND_BOARD_ID));
    }
}
