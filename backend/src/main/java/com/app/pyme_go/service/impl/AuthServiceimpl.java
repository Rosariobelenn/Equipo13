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
import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.model.dto.legalrepresentative.LegalRepresentativeDto;
import com.app.pyme_go.model.dto.user.AdminResponseDto;
import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.RegisterDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;
import com.app.pyme_go.model.dto.user.UserRegisterDto;
import com.app.pyme_go.model.dto.user.UserResponseDto;
import com.app.pyme_go.model.entity.Company;
import com.app.pyme_go.model.entity.LegalRepresentative;
import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.UserRepository;
import com.app.pyme_go.service.AuthService;
import com.app.pyme_go.service.CompanyService;
import com.app.pyme_go.service.LegalRepresentativeService;
import com.app.pyme_go.service.UserService;

@Service
public class AuthServiceimpl implements AuthService {

    @Value("${application.security.jwt.expiration}")
    private long expiration;
    private final UserService userService;
    private final CompanyService companyService;
    private final LegalRepresentativeService legalRepresentativeService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    public AuthServiceimpl(
        UserService userService, 
        LegalRepresentativeService legalRepresentativeService, 
        CompanyService companyService,
        PasswordEncoder passwordEncoder,
        JwtUtil jwtUtil, 
        AuthenticationManagerBuilder authenticationManagerBuilder, 
        UserRepository userRepository
    ) {
        this.userService = userService;
        this.legalRepresentativeService = legalRepresentativeService; 
        this.companyService = companyService;
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
    public AuthResponseDto registerUser(
            UserRegisterDto user,
            LegalRepresentativeDto legalRepresentative,
            CompanyDto company) {
        if (userService.existsByGmail(user.getGmail())) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }

        AuthResponseDto authResponse = new AuthResponseDto();

        try {

            String roleName = "USER";

            User newUser = new User();
            newUser.setGmail(user.getGmail());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setRole(roleName);

            userService.save(newUser);

            LegalRepresentative newLegalRep = new LegalRepresentative();
            newLegalRep.setUser(newUser);
            newLegalRep.setFullName(legalRepresentative.getFull_name());
            newLegalRep.setPosition(legalRepresentative.getPosition());
            newLegalRep.setDocumentType(legalRepresentative.getDocument_type());
            newLegalRep.setDocumentNumber(legalRepresentative.getDocument_number());
            newLegalRep.setCorporateEmail(legalRepresentative.getCorporate_email());
            newLegalRep.setContactPhone(legalRepresentative.getContact_phone());
            newLegalRep.setUser(newUser);

            legalRepresentativeService.save(newLegalRep);
        

            Company newCompany = new Company();
            newCompany.setBusinessName(company.getBusiness_name());
            newCompany.setTaxId(company.getTax_id());
            newCompany.setCompanyType(company.getCompany_type());
            newCompany.setLegalRepresentative(newLegalRep);

            companyService.save(newCompany);


            // for autentication afther register a new user
            String jwt = authenticate(user.getGmail(), user.getPassword());
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