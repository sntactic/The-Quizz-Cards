package com.mongoApp.quizzcards.service;

import com.mongoApp.quizzcards.dto.NotifBody;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class SendNotifService {
    private final WebClient webClient;

    public SendNotifService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> sendNotif(NotifBody notifBody) {
        System.out.println("Envoi de la notification");
        return webClient.post()
                .uri("http://n8n:5678/webhook/539ef4fa-8eab-4cf4-b19d-06566201a8f7")
                .bodyValue(notifBody)
                .retrieve()
                .bodyToMono(String.class)
                .onErrorMap(e -> new RuntimeException("Erreur lors de l'envoi de la notification", e));
    }
}