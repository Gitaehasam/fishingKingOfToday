package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.Board;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    @Query(value = "SELECT board FROM Board board LEFT JOIN board.user user")
    Slice<Board> findBoardByPageable(final Pageable pageable);

    boolean existsByUserSocialIdAndId(final String socialId, final Integer id);

    List<Board> findByUserSocialIdAndCategoryId(final String socialId, final Integer categoryId);

    @Query(
            value =
                    "SELECT DISTINCT b.fishBook.id FROM Board b JOIN b.user u WHERE u.id = :id AND b.fishBook.id IN (25, 44, 17, 36, 7, 9)")
    List<Integer> findFishbookByUserId(@Param("id") final Integer id);

    @Query(
            value =
                    "SELECT b.createdAt FROM Board b JOIN b.user u WHERE u.id = :userid AND b.fishBook.id = :fishbookid")
    List<LocalDateTime> findCreatedAtByUserIdAndFishBookId(
            @Param("userid") final Integer userid, @Param("fishbookid") final Integer fishBookId);
}
