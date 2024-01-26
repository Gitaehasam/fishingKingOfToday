package com.ssafy.sub.pjt.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardRequest {

    private String imageUrl;
    private LocalDateTime createdAt;
    private Float longitude;
    private Float latitude;
    private Integer categoryId;
    private Integer fishBookId;
    private String content;
    private List<String> hashTags;
}
