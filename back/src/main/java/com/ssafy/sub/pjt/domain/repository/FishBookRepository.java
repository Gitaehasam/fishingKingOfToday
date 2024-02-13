package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.FishBook;
import com.ssafy.sub.pjt.dto.FishType;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FishBookRepository extends JpaRepository<FishBook, Integer> {
    //    @Query("select * from fish_book")
    List<FishBook> findAll();

    List<FishBook> findByFishType(FishType fishType);

    List<FishBook> findTop3ByNameStartsWithOrderByNameAsc(String name);

    @Query(
            value =
                    "SELECT fb FROM FishBook fb "
                            + "JOIN Board bd ON fb.id = bd.fishBook "
                            + "WHERE bd.user.id= :id")
    Slice<FishBook> findFishListByUserId(final Pageable pageable, @Param("id") final Integer id);
}
