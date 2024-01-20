package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.LiveRoom;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LiveRoomRepository extends JpaRepository<LiveRoom, Integer> {

    @Query(
            value =
                    "SELECT live_room FROM LiveRoom live_room LEFT JOIN User user ON user.id = live_room.id WHERE live_room.name like %:name%")
    Slice<LiveRoom> findBySearchCondition(String name, Pageable pageable);
}
