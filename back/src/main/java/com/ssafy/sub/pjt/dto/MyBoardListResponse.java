package com.ssafy.sub.pjt.dto;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MyBoardListResponse {
    final List<MyBoardResponse> myBoardResponses;
}
