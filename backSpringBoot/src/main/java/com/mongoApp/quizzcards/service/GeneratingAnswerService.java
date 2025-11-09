package com.mongoApp.quizzcards.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class GeneratingAnswerService {
    private final ChatClient chatClient;

    public GeneratingAnswerService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String generateAnswer(String question) {
        return chatClient.prompt()
                .user(question+" : la reponse doit etre la plus minimal possible!")
                .call()
                .content();
    }
}
