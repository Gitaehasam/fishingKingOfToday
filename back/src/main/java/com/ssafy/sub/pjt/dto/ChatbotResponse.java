package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class ChatbotResponse {
    private final String text;
    private final String imageUrl;
    private final String move;

    public static ChatbotResponse of(final String text, final String imageUrl, final String move) {
        return new ChatbotResponse(text, imageUrl, move);
    }
}
