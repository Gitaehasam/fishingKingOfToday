package com.ssafy.sub.pjt.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MyPageRequest {

    @NotBlank(message = "닉네임은 공백이 될 수 없습니다.")
    @Size(max = 15, message = "닉네임은 15자를 초과할 수 없습니다.")
    private final String nickname;

    @NotBlank(message = "프로필 사진은 필수입니다.")
    private final String imageUrl;
}
