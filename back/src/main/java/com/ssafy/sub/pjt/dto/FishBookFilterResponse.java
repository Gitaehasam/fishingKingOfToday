package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.FishBook;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class FishBookFilterResponse {

    private final Integer id;
    private final String name;

    public static FishBookFilterResponse of(final FishBook fishBook) {
        return new FishBookFilterResponse(fishBook.getId(), fishBook.getName());
    }
}
