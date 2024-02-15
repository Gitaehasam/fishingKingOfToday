package com.ssafy.sub.pjt.dto;

import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BoardListResponse implements Serializable {
    private final List<BoardResponse> boards;
    private final Boolean hasNext;
}
