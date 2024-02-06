package com.ssafy.sub.pjt.controller;

import com.ssafy.sub.pjt.dto.ChatbotRequest;
import com.ssafy.sub.pjt.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatbot")
public class ChatbotController {
    private final ChatbotService chatbotService;

    @PostMapping
    public String chatbot(@RequestBody final ChatbotRequest chatbotRequest) {
        return chatbotService.chatbot(chatbotRequest.getInputText());
    }
}
