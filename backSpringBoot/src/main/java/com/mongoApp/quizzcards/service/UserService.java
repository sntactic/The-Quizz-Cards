package com.mongoApp.quizzcards.service;

import com.mongoApp.quizzcards.dto.SignUpRequest;
import com.mongoApp.quizzcards.model.User;
import com.mongoApp.quizzcards.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  public User createUser(SignUpRequest request) {
    User u = userRepository.findByEmail(request.getEmail());

    if (u != null) {
      System.out.println("Un utilisateur existe déjà avec cet email : " + u.getEmail());
      return null;
    }

    User user = new User();
    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole("USER");

    userRepository.save(user);
    System.out.println("Nouvel utilisateur créé : " + user.getEmail());

    return user;
  }

}
