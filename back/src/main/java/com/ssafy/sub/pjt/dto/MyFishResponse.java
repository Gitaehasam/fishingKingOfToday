package com.ssafy.sub.pjt.dto;

import com.ssafy.sub.pjt.domain.FishBook;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class MyFishResponse {

    private final Integer id;

    private final String name;

    public static MyFishResponse of(final FishBook fishBook) {
        return new MyFishResponse(fishBook.getId(), fishBook.getName());
    }
}
