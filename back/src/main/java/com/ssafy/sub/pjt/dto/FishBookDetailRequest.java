package com.ssafy.sub.pjt.dto;

import javax.validation.constraints.Positive;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FishBookDetailRequest {

    @Positive(message = "물고기 ID는 양수만 가능합니다.")
    private Integer fishBookId;
}
