package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.FishBook;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishBookRepository extends JpaRepository<FishBook, Integer> {
    //    @Query("select * from fish_book")
    Slice<FishBook> findSliceBy(final Pageable pageable);
}
