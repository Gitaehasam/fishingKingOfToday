package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.TutorialInfo;
import com.ssafy.sub.pjt.domain.Tutorials;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class TutorialResponse {
    private final String name;

    private final List<TutorialInfo> tutorialInfo;

    public static TutorialResponse of(final Tutorials tutorials) {
        return new TutorialResponse(tutorials.getName(), tutorials.getTutorialInfo());
    }
}
