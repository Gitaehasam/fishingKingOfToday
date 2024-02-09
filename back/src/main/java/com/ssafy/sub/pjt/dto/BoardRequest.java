package com.ssafy.sub.pjt.dto;

import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardRequest {

    @Size(max = 100)
    private String imageUrl;

    private LocalDateTime createdAt;

    private Float longitude;

    private Float latitude;

    @NotNull(message = "카테고리가 있어야 합니다.")
    private Integer categoryId;

    private Integer fishBookId;

    @NotNull private String content;

    private List<String> hashTags;

    @NotNull(message = "낚시터 장소에 대한 고유값이 필요합니다.")
    private Integer fishingSpotId;
}
