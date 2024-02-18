package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;

import com.ssafy.sub.pjt.domain.repository.BoardRepository;
import com.ssafy.sub.pjt.service.AquariumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/aquarium")
public class AquariumController {
    private final AquariumService aquariumService;
    private final BoardRepository boardRepository;

    @GetMapping()
    public ResponseEntity<?> getTutorial() {
        // Bo tutorialResponse = aquariumService.getTutorial(tutorialId);
        return ResponseEntity.ok().body(aquariumService.getMyFish(getCurrentUserSocialId()));
    }
}
