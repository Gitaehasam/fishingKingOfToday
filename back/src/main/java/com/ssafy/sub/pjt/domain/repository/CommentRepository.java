package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {}
