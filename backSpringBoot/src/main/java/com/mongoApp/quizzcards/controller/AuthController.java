package com.mongoApp.quizzcards.controller;
import com.mongoApp.quizzcards.dto.AuthResponse;
import com.mongoApp.quizzcards.dto.CustomUserDetails;
import com.mongoApp.quizzcards.dto.LoginRequest;
import com.mongoApp.quizzcards.dto.SignUpRequest;
import com.mongoApp.quizzcards.model.User;
import com.mongoApp.quizzcards.service.JWTService;
import com.mongoApp.quizzcards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController()
public class AuthController {
  @Autowired
  private UserService userService;
  private final JWTService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthController(JWTService jwtService , AuthenticationManager authenticationManager){
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.getUsername(),
        request.getPassword()
      )
    );

    CustomUserDetails CustomUser = (CustomUserDetails) authentication.getPrincipal();
    String jwt = jwtService.generateToken(CustomUser);

    return ResponseEntity.ok(new AuthResponse(jwt));
  }

  @PostMapping("/signup")
  public String signup(@RequestBody SignUpRequest request) {
    User user = userService.createUser(request);

    if (user == null) {
      return "exist";
    }

    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.getEmail(),
        request.getPassword()
      )
    );

    CustomUserDetails CustomUser = (CustomUserDetails) authentication.getPrincipal();

    return jwtService.generateToken(CustomUser);
  }
}
