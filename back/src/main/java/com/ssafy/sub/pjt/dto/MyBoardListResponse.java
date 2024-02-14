package com.ssafy.sub.pjt.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class MyBoardListResponse {
    final List<MyBoardResponse> myBoardResponses;
}
