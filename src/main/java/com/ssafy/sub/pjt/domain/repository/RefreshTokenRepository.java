package com.ssafy.sub.pjt.domain.repository;

import com.ssafy.sub.pjt.domain.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {}
