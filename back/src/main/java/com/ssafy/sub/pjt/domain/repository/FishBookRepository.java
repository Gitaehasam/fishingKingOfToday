package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.FishBook;
import com.ssafy.sub.pjt.dto.FishType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishBookRepository extends JpaRepository<FishBook, Integer> {
    //    @Query("select * from fish_book")
    List<FishBook> findAll();

    List<FishBook> findByFishType(FishType fishType);

    List<FishBook> findTop3ByNameStartsWithOrderByNameAsc(String name);
}
