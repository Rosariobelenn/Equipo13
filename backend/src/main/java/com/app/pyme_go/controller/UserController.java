package com.app.pyme_go.controller;

import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;
import com.app.pyme_go.model.dto.user.UserRegisterDto;
import com.app.pyme_go.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/api")
public class UserController {

    private final AuthService authService;


    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDto loginUserDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Devolvemos los mensajes de error específicos de la validación
            String errors = bindingResult.getAllErrors().stream()
                    .map(e -> e.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errors);
        }
        try {

            System.out.println("Email: " + loginUserDto.getGmail());
            System.out.println("Password: " + loginUserDto.getPassword());
            
            AuthResponseDto response = authService.autenticateUser(loginUserDto);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDto newUserDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Devolvemos los mensajes de error específicos de la validación
            String errors = bindingResult.getAllErrors().stream()
                    .map(e -> e.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errors);
        }
        try {
            AuthResponseDto response = authService.registerUser(newUserDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /*
      
    @GetMapping("/check-auth")
    public ResponseEntity<String> checkAuth() {
        return ResponseEntity.ok().body("Autenticado");
    }

    */

    @GetMapping("/hello")
    public String hello() {
        return String.format("Hello Protected rute");
    }

}