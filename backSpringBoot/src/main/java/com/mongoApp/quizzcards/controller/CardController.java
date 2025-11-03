package com.mongoApp.quizzcards.controller;

import com.mongoApp.quizzcards.model.Card;
import com.mongoApp.quizzcards.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CardController {
  @Autowired
  private CardService cardService;

  @GetMapping("/allcards")
  public Iterable<Card> getAllCards() {
    return cardService.getAllCards();
  }

  @GetMapping("/test")
  public String success(){
    return "SUCCES";
  }

  @GetMapping("/cards/{userID}")
  public Iterable<Card> getMyCards(@PathVariable("userID") final String userID) {
    return cardService.getMyCards(userID);
  }

  @PostMapping("/cards")
  public void saveCard(@RequestBody Card card) {
    cardService.saveCard(card);
  }

  @PutMapping("/cards/{id}")
  public void updateCard(@RequestBody Card card , @PathVariable("id") final String id){
     card.setId(id);
     cardService.saveCard(card);
  }

  @DeleteMapping("/cards/{id}")
  public void deleteCard(@PathVariable("id") final String id){
    cardService.deleteCard(id);
  }

}
