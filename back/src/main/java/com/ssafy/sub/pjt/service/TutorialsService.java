package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_TUTORIAL;

import com.ssafy.sub.pjt.domain.Tutorials;
import com.ssafy.sub.pjt.domain.repository.TutorialsRepository;
import com.ssafy.sub.pjt.dto.TutorialResponse;
import com.ssafy.sub.pjt.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TutorialsService {

    private final TutorialsRepository tutorialsRepository;

    public TutorialResponse getTutorial(final Integer id) {
        Tutorials tutorials =
                tutorialsRepository
                        .findById(id)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_TUTORIAL));
        return TutorialResponse.of(tutorials);
    }
}
