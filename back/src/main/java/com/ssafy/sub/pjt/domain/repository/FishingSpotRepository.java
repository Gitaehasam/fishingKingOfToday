package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.FishingSpot;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FishingSpotRepository extends JpaRepository<FishingSpot, Integer> {
    @Query(
            value =
                    "SELECT h.name FROM Board b "
                            + "LEFT JOIN b.boardHashTags bh JOIN bh.hashTag h "
                            + "where b.fishingSpot.id = :id "
                            + "GROUP BY h.name ORDER BY count(h.name) DESC ")
    List<String> findHashtagsBySpotId(@Param("id") final Integer id, Pageable pageable);

    FishingSpot findFishingSpotById(@Param("id") final Integer fishingSpotId);

    List<FishingSpot> findTop3ByNameStartsWithOrderByNameAsc(String name);
}
