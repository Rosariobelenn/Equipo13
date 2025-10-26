package com.app.pyme_go.service.impl;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;
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
import com.app.pyme_go.model.dto.document.DocumentInfoDto;
import com.app.pyme_go.model.dto.legalrepresentative.LegalRepresentativeDto;
import com.app.pyme_go.model.dto.user.AdminResponseDto;
import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.RegisterDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;
import com.app.pyme_go.model.dto.user.UserRegisterDto;
import com.app.pyme_go.model.dto.user.UserResponseDto;
import com.app.pyme_go.exception.UserAlreadyExistsException;
import com.app.pyme_go.model.entity.Company;
import com.app.pyme_go.model.entity.Document;
import com.app.pyme_go.model.entity.LegalRepresentative;
import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.DocumentRepository;
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
    private final DocumentRepository documentRepository;

    @Autowired
    public AuthServiceimpl(
        UserService userService, 
        LegalRepresentativeService legalRepresentativeService, 
        CompanyService companyService,
        PasswordEncoder passwordEncoder,
        JwtUtil jwtUtil, 
        AuthenticationManagerBuilder authenticationManagerBuilder, 
        UserRepository userRepository,
        DocumentRepository documentRepository
    ) {
        this.userService = userService;
        this.legalRepresentativeService = legalRepresentativeService; 
        this.companyService = companyService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
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
            throw new AuthenticationException("Credenciales inválidas. Por favor, revise su correo y contraseña.", e) {};
        }

    }

    @Override
    public AuthResponseDto registerUser(RegisterDto registerDto) {
        UserRegisterDto user = registerDto.getUser();
        LegalRepresentativeDto legalRepresentative = registerDto.getLegal_representative();
        CompanyDto company = registerDto.getCompany();

        if (userService.existsByGmail(user.getGmail())) {
            throw new UserAlreadyExistsException("El correo electrónico '" + user.getGmail() + "' ya está en uso.");
        }

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

        legalRepresentativeService.save(newLegalRep);
    
        Company newCompany = new Company();
        newCompany.setBusinessName(company.getBusiness_name());
        newCompany.setTaxId(company.getTax_id());
        newCompany.setCompanyType(company.getCompany_type());
        newCompany.setLegalRepresentative(newLegalRep);

        companyService.save(newCompany);

        List<DocumentInfoDto> documentInfos = registerDto.getDocuments();
        if (documentInfos != null && !documentInfos.isEmpty()) {
            for (DocumentInfoDto docInfo : documentInfos) {
                Document newDocument = new Document();
                newDocument.setDocumentableId(newCompany.getId());
                newDocument.setDocumentableType("Company");
                newDocument.setDocumentType(docInfo.getDocumentType());
                newDocument.setFilePath(docInfo.getUrl());
                documentRepository.save(newDocument);
            }
        }

        String jwt = authenticate(user.getGmail(), user.getPassword());
        User registeredUser = userRepository.findByGmail(user.getGmail())
                .orElseThrow(() -> new RuntimeException("Could not retrieve user after registration"));
        UserResponseDto userDto = new UserResponseDto(
            registeredUser.getId(), 
            registeredUser.getGmail(),
            registeredUser.getRole()
        );

        AuthResponseDto authResponse = new AuthResponseDto();
        authResponse.setAccess_token(jwt);
        authResponse.setExpires_in(expiration);
        authResponse.setUser(userDto);
          
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
            adminDto.setName("Admin"); 
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