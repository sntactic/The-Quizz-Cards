package com.mongoApp.quizzcards;

import com.mongoApp.quizzcards.service.CardService;
import com.mongoApp.quizzcards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuizzcardsApplication implements CommandLineRunner {

    @Autowired
    CardService cardService;

	public static void main(String[] args) {
        SpringApplication.run(QuizzcardsApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
        cardService.getMyCards("6893e85ea3ed3bc211246e29").forEach(card -> System.out.println(card.getQuestion()));
    }
}
