package com.ssafy.sub.pjt.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class BoardSearchCondition {
    private String sortType;
    private Integer fishBookId;
    private Integer hashTagId;
    private Integer categoryId;
}
