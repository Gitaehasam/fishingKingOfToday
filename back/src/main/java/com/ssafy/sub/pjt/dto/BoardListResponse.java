package com.ssafy.sub.pjt.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BoardListResponse {
    private final List<BoardResponse> boards;
    private final Boolean hasNext;
}
