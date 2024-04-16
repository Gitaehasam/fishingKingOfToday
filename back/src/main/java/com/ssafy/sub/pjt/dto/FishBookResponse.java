package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.FishBook;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class FishBookResponse implements Serializable {

    private final Integer id;
    private final String name;
    private final String tabooStartAt;
    private final String tabooEndAt;
    private final Integer mininumSize;
    private final FishType fishType;
    private final String imageUrl;

    public static String getLocalDateToString(LocalDate localDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedString = localDate.format(formatter);
        return formattedString;
    }

    public static FishBookResponse of(final FishBook fishBook) {
        return new FishBookResponse(
                fishBook.getId(),
                fishBook.getName(),
                getLocalDateToString(fishBook.getTabooStartAt()),
                getLocalDateToString(fishBook.getTabooEndAt()),
                fishBook.getMinimumSize(),
                fishBook.getFishType(),
                fishBook.getImageUrl());
    }
}
