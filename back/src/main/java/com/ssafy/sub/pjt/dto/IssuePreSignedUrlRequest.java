package com.ssafy.sub.pjt.dto;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class IssuePreSignedUrlRequest {

    @NotBlank(message = "파일 확장자를 입력해주세요.")
    private ImageFileExtension imageFileExtension;

    @NotBlank(message = "이미지가 업로드 되는 타입(PROFILE, BOARD)을 입력해주세요.")
    private ImageUploadType type;
}
