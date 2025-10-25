package com.app.pyme_go.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.pyme_go.model.dto.legalrepresentative.UserRepresentativeDto;
import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.UserRepository;
import com.app.pyme_go.service.LegalRepresentativeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/v1/api")
@Tag(name = "Legal representative info", description = "Info legal representative")
public class LegalRepresentativeController {

    private final LegalRepresentativeService legalRepresentativeService;
    private final UserRepository userRepository;

    public LegalRepresentativeController(LegalRepresentativeService legalRepresentativeService,
            UserRepository userRepository) {
        this.legalRepresentativeService = legalRepresentativeService;
        this.userRepository = userRepository;
    }

    @Operation(summary = "Ver informacion del usuario", description = "Muestra todos los datos de contacto del usuario")
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id, Authentication authentication) {

        String authenticatedUserEmail = authentication.getName();

      
           
            Optional<User> authenticatedUserOptional = userRepository.findByGmail(authenticatedUserEmail);
            if (authenticatedUserOptional.isEmpty()) {
                throw new UsernameNotFoundException("Authenticated user not found in database");
            }

            User authenticatedUser = authenticatedUserOptional.get();
            if (!authenticatedUser.getId().equals(id)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Access denied: you can only view your own data"));
            }

            Long id_user = authenticatedUser.getId();
        
            Optional<UserRepresentativeDto> representativeOptional = legalRepresentativeService.findById(id_user);

            return representativeOptional
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User or Legal Representative not found for id: " + id)));
       
    }
}
