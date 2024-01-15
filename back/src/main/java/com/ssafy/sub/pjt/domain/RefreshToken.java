package com.ssafy.sub.pjt.domain;

import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RefreshToken {

    @Id private String token;

    private Long memberId;
}
