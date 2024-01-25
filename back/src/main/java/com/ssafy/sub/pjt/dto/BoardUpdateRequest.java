package com.ssafy.sub.pjt.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardUpdateRequest {
    private String imageUrl;
    private Integer categoryId;
    private Integer fishBookId;
    private String content;
    private List<String> hashTags;
}
