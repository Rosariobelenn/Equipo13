package com.app.pyme_go.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.model.dto.legalrepresentative.UserRepresentativeDto;
import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.MeDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;
import com.app.pyme_go.model.entity.Company;
import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.UserRepository;
import com.app.pyme_go.model.dto.user.RegisterDto;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.app.pyme_go.service.AuthService;
import com.app.pyme_go.service.CompanyService;
import com.app.pyme_go.service.LegalRepresentativeService;
import com.app.pyme_go.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/api")
@Tag(name = "Authentication", description = "Endpoints para registro e inicio de sesión.")
public class UserController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final LegalRepresentativeService legalRepresentativeService;
    private final CompanyService companyService;

    public UserController(
            AuthService authService,
            UserRepository userRepository,
            LegalRepresentativeService legalRepresentativeService,
            CompanyService companyService) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.legalRepresentativeService = legalRepresentativeService;
        this.companyService = companyService;
    }

    @Operation(summary = "Iniciar sesión", description = "Autentica a un usuario con su email y contraseña, devolviendo un token de acceso.")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody UserLoginDto loginUserDto) {
        try {
            AuthResponseDto response = authService.autenticateUser(loginUserDto);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            // Captura la excepción de autenticación y devuelve un 401 con un mensaje
            // detallado
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponseDto(null, null, null, e.getMessage()));
        }
    }

    @Operation(summary = "Registrar nuevo usuario", description = "Registra un nuevo usuario junto con su empresa y datos de representante legal en un solo paso.")
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterDto newUserDto) {
        AuthResponseDto response = authService.registerUser(
                newUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello Protected route";
    }

}