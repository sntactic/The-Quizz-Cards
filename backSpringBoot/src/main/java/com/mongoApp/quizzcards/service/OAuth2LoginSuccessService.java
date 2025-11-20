package com.mongoApp.quizzcards.service;

import com.mongoApp.quizzcards.dto.CustomUserDetails;
import com.mongoApp.quizzcards.dto.NotifBody;
import com.mongoApp.quizzcards.model.User;
import com.mongoApp.quizzcards.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class OAuth2LoginSuccessService implements AuthenticationSuccessHandler {

    @Value ("${IP_HOST}")
    private String ipHost;

    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final SendNotifService sendNotifService;

    public OAuth2LoginSuccessService(JWTService jwtService,
                                     UserRepository userRepository,
                                     SendNotifService sendNotifService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.sendNotifService = sendNotifService;
    }

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException {

    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

    String mail = oAuth2User.getAttribute("email");
    String name = oAuth2User.getAttribute("name");

    User user = userRepository.findByEmail(mail);
    if (user == null) {
        user = new User();
        user.setEmail(mail);
        user.setName(name);
        user.setRole("USER");
        userRepository.save(user);
        sendNotifService.sendNotif(new NotifBody(user.getEmail(), user.getName()))
            .subscribe(
                    result -> System.out.println("Notification envoyée: " + result),
                    error -> System.err.println("Erreur notification: " + error.getMessage())
            );
    }


    CustomUserDetails userDetails = new CustomUserDetails(
      user.getId(),
      user.getName(),
      user.getEmail(),
      "",
      List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
    );

    String token = jwtService.generateToken(userDetails);

    response.sendRedirect("http://"+this.ipHost+"/auth/callback?token=" + token);
  }
}
