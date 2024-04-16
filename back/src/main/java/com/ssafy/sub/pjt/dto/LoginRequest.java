package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = PRIVATE)
public class LoginRequest {

    @NotBlank(message = "code가 필요합니다.")
    private String code;
}
