package com.mongoApp.quizzcards.service;

import com.mongoApp.quizzcards.model.Card;
import com.mongoApp.quizzcards.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    @Autowired
    CardRepository cardRepository;

    public void saveCard(Card card){
        cardRepository.save(card);
    }

    public Iterable<Card> getAllCards(){
        return cardRepository.findAll();
    }

    public Iterable<Card> getMyCards(String id){
        return cardRepository.findByuserID(id).orElse(null);
    }

    public void updateCard(){

    }

    public void deleteCard(String id){

    }
}
