package com.mongoApp.quizzcards.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
  @GetMapping("/user")
  public String getUser(){
    return "welcome , user";
  }

  @GetMapping("/admin")
  public String getAdmin(){
    return "welcome , admin";
  }
}
