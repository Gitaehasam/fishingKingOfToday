package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.HashTag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashTagRepository extends JpaRepository<HashTag, Integer> {

    Optional<HashTag> findByName(String name);
}
