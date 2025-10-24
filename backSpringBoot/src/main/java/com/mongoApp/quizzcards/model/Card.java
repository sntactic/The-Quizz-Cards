package com.mongoApp.quizzcards.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "cards")
@Data
public class Card {
    @Id
    @Transient
    private String id;
    private String domaine;
    private String categorie;
    private String question;
    private String reponse;
    private String explication;
    private String publication;
    private Date date;
    private String userID;

}
