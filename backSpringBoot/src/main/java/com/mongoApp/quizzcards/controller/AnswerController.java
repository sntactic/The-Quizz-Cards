package com.mongoApp.quizzcards.controller;

import com.mongoApp.quizzcards.service.GeneratingAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AnswerController {
    @Autowired
    private GeneratingAnswerService generatingAnswerService;

    @PostMapping("/answer")
    public String answer(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        return generatingAnswerService.generateAnswer(question);
    }
}
