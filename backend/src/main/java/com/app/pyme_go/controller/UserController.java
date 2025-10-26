package com.app.pyme_go.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;
import com.app.pyme_go.model.dto.user.RegisterDto;
import com.app.pyme_go.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/api")
@Tag(name = "Authentication", description = "Endpoints para registro e inicio de sesión.")
public class UserController {

    private final AuthService authService;


    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Iniciar sesión", description = "Autentica a un usuario con su email y contraseña, devolviendo un token de acceso.")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody UserLoginDto loginUserDto) {
        AuthResponseDto response = authService.autenticateUser(loginUserDto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Registrar nuevo usuario", description = "Registra un nuevo usuario junto con su empresa y datos de representante legal en un solo paso.")
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterDto newUserDto) {
        AuthResponseDto response = authService.registerUser(
            newUserDto
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/hello")
    public String hello() {
        return "Hello Protected route";
    }

}