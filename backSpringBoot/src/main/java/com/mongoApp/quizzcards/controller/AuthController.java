package com.mongoApp.quizzcards.controller;
import com.mongoApp.quizzcards.service.JWTService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController()
public class AuthController {
  public JWTService jwtService;

  public AuthController(JWTService jwtService){
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public String getToken(Authentication authentication){
    return jwtService.generateToken(authentication);
  }
}
