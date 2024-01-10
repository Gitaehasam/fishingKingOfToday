package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findBySocialId(String socialLoginId);

    boolean existsByNickName(String nickname);

    void deleteBySocialId(final Long socialId);

    boolean existsBySocialId(String socialId);
}
