package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.Board;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    @Query(value = "SELECT board FROM Board board LEFT JOIN board.user user")
    Slice<Board> findBoardByPageable(final Pageable pageable);

    boolean existsByUserSocialIdAndId(final String socialId, final Integer id);

    List<Board> findByUserSocialIdAndCategoryId(final String socialId, final Integer categoryId);

    List<Board> findDistinctByUserIdAndFishBookIsNotNullAndFishingSpotIsNotNull(final Integer id);
}
