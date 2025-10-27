package com.app.pyme_go.config.jwt;


import java.util.Date;
import java.util.Base64;

import javax.crypto.SecretKey;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.Authentication;


@Component
public class JwtUtil {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long expiration;

    private SecretKey key;

    @PostConstruct
    public void init() {
        // Ensure we have at least 256 bits (32 bytes) for HMAC-SHA256
        byte[] keyBytes;
        if (secretKey.length() < 32) {
            // If the key is too short, pad it or use a secure default
            keyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();
        } else {
            // Use the first 32 bytes of the secret key
            keyBytes = secretKey.substring(0, 32).getBytes();
        }
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication authentication) {

        UserDetails mainUser = (UserDetails) authentication.getPrincipal();
        String role = mainUser.getAuthorities().iterator().next().getAuthority();


        return Jwts.builder().setSubject(mainUser.getUsername())
                .claim("role", "ROLE_" + role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

      public Boolean validateToken(String token, UserDetails userDetails){
        final String userName = extractGmail(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token){
        return extractAllClaims(token).getExpiration();
    }
    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractGmail(String token){
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

}