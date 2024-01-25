package com.ssafy.sub.pjt.service;

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

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.*;

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

    @Transactional
    public void delete(String socialId, Integer boardId, Integer commentId) {
        Board board = findBoardById(boardId);
        User user = findUserBySocialId(socialId);
        Comment comment = findCommentById(commentId);

        if (board.isNotWrittenBy(user) && comment.isNotCommentedBy(user)) {
            throw new BadRequestException(CANNOT_DELETE_COMMENT_EXCEPTION);
        }

        commentRepository.delete(comment);
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

    public Comment findCommentById(Integer commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new BadRequestException(COMMENT_NOT_FOUND_EXCEPTION));
    }
}
