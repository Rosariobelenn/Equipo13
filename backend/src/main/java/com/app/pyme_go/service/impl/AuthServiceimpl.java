package com.app.pyme_go.service.impl;

import org.springframework.beans.factory.annotation.Value;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.pyme_go.config.jwt.JwtUtil;
import com.app.pyme_go.model.dto.user.AdminResponseDto;
import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;
import com.app.pyme_go.model.dto.user.UserRegisterDto;
import com.app.pyme_go.model.dto.user.UserResponseDto;
import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.UserRepository;
import com.app.pyme_go.service.AuthService;
import com.app.pyme_go.service.UserService;

@Service
public class AuthServiceimpl implements AuthService {

    @Value("${application.security.jwt.expiration}")
    private long expiration;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    public AuthServiceimpl(UserService userService, PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil, AuthenticationManagerBuilder authenticationManagerBuilder, UserRepository userRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userRepository = userRepository;
    }

    @Override
    public String authenticate(String username, String password) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
                    password);
            Authentication authResult = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authResult);
            return jwtUtil.generateToken(authResult);

        } catch (AuthenticationException e) {
            throw new RuntimeException("Credenciales inválidas. Por favor, revise su correo y contraseña.", e);
        }

    }

    @Override
    public AuthResponseDto registerUser(UserRegisterDto newUserDto) {
        if (userService.existsByGmail(newUserDto.getGmail())) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }

        AuthResponseDto authResponse = new AuthResponseDto();

        try {

            String roleName = "USER";

            User user = new User();
            user.setGmail(newUserDto.getGmail());
            user.setPassword(passwordEncoder.encode(newUserDto.getPassword()));
            user.setRole(roleName);

            userService.save(user);

            // for autentication afther register a new user
            String jwt = authenticate(newUserDto.getGmail(), newUserDto.getPassword());
            Optional<User> registeredUser = userRepository.findByGmail(user.getGmail());

            if (registeredUser.isEmpty()) {
                throw new RuntimeException("No se pudo recuperar el usuario después del registro");
            }

            UserResponseDto userDto = new UserResponseDto();
            userDto.setId(registeredUser.get().getId());
            userDto.setGmail(registeredUser.get().getGmail());
            userDto.setRole(registeredUser.get().getRole());

            authResponse = new AuthResponseDto();
            authResponse.setAccess_token(jwt);
            authResponse.setUser(userDto);
            authResponse.setExpires_in(expiration);

        } catch (Exception e) {
            throw new RuntimeException("No se pudo registrar el usuario", e);
        }

        return authResponse;
    }

    @Override
    public AuthResponseDto autenticateUser(UserLoginDto userLoginDto) {

        String jwt = authenticate(userLoginDto.getGmail(), userLoginDto.getPassword());
        Optional<User> loggedInUser = userRepository.findByGmail(userLoginDto.getGmail());

        AuthResponseDto authResponse = new AuthResponseDto();
        authResponse.setAccess_token(jwt);
        authResponse.setExpires_in(expiration);

        if ("ADMIN".equals(loggedInUser.get().getRole())) {
         
            AdminResponseDto adminDto = new AdminResponseDto();
            adminDto.setId(loggedInUser.get().getId());
            adminDto.setEmail(loggedInUser.get().getGmail());
            adminDto.setRole(loggedInUser.get().getRole());
            // Asumiendo que el admin tiene un nombre, que no está en la entidad User.
            // Esto podría necesitar un ajuste en el modelo User o una entidad AdminProfile.
            adminDto.setName("Admin"); // Placeholder
            authResponse.setUser(adminDto);


        } else {
            UserResponseDto userDto = new UserResponseDto();
            userDto.setId(loggedInUser.get().getId());
            userDto.setGmail(loggedInUser.get().getGmail());
            userDto.setRole(loggedInUser.get().getRole());
            authResponse.setUser(userDto);
        }

        return authResponse;

    }
}