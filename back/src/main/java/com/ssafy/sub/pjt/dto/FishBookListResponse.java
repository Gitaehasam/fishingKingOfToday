package com.ssafy.sub.pjt.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FishBookListResponse {
    private final List<FishBookResponse> fishBooks;
    private final Boolean hasNext;
}
