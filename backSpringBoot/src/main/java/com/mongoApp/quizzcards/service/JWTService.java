package com.mongoApp.quizzcards.service;

import com.mongoApp.quizzcards.dto.CustomUserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class JWTService {
  private JwtEncoder jwtEncoder;

  public JWTService(JwtEncoder jwtEncoder){
    this.jwtEncoder = jwtEncoder;
  }

  public String generateToken(CustomUserDetails user) {
    Instant now = Instant.now();

    JwtClaimsSet claims = JwtClaimsSet.builder()
      .issuer("self")
      .issuedAt(now)
      .expiresAt(now.plus(1, ChronoUnit.DAYS))
      .subject(user.getUsername())
      .claim("userID", user.getId())
      .claim("email", user.getEmail())
      .claim("userName", user.getUsername())
      .claim("roles", user.getAuthorities()
        .stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList())
      )
      .build();

    JwtEncoderParameters jwtEncoderParameters =
      JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims);

    return this.jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
  }

}
