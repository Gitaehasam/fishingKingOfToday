package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.TutorialResponse;
import com.ssafy.sub.pjt.service.TutorialsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tutorials")
public class TutorialController {

    private final TutorialsService tutorialService;

    @GetMapping("/{tutorialId}")
    public ResponseEntity<?> getTutorial(@PathVariable final Integer tutorialId) {
        TutorialResponse tutorialResponse = tutorialService.getTutorial(tutorialId);
        return ResponseEntity.ok().body(tutorialResponse);
    }
}
