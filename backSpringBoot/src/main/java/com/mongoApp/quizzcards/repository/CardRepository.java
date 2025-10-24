package com.mongoApp.quizzcards.repository;

import com.mongoApp.quizzcards.model.Card;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CardRepository extends MongoRepository<Card , String> {
    public Optional<Iterable<Card>> findByuserID(String id);
}
