package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.FishBook;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class FishBookAutoCompleteResponse {

    private final Integer id;
    private final String name;

    public static FishBookAutoCompleteResponse of(final FishBook fishBook) {
        return new FishBookAutoCompleteResponse(fishBook.getId(), fishBook.getName());
    }
}
