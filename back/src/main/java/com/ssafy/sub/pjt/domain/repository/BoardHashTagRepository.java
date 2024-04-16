package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.BoardHashTag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardHashTagRepository extends JpaRepository<BoardHashTag, Integer> {
    @Query("SELECT b FROM BoardHashTag b GROUP BY b.hashTag.id ORDER BY COUNT(b.id) DESC")
    List<BoardHashTag> findTop5ByOrderByCountDesc();
}
