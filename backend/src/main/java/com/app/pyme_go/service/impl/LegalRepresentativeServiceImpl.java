package com.app.pyme_go.service.impl;

import com.app.pyme_go.model.dto.legalrepresentative.UserRepresentativeDto;
import com.app.pyme_go.model.entity.LegalRepresentative; // Assuming this entity exists
import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.LegalRepresentativeRepository; // Assuming this repository exists
import com.app.pyme_go.repository.UserRepository;
import com.app.pyme_go.service.LegalRepresentativeService;
import org.springframework.stereotype.Service;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class LegalRepresentativeServiceImpl implements LegalRepresentativeService {

    private static final Logger log = LoggerFactory.getLogger(LegalRepresentativeServiceImpl.class);

    private final UserRepository userRepository;
    private final LegalRepresentativeRepository legalRepresentativeRepository;

    public LegalRepresentativeServiceImpl(UserRepository userRepository, LegalRepresentativeRepository legalRepresentativeRepository) {
        this.userRepository = userRepository;
        this.legalRepresentativeRepository = legalRepresentativeRepository;
    }

    @Override
    public Optional<UserRepresentativeDto> findById(Long userId) {
        log.info("Attempting to find legal representative for user ID: {}", userId);

        // First, find the User entity by its ID
        Optional<User> userOptional = userRepository.findById(userId);

        // If the user is found, then find the associated LegalRepresentative
        return userOptional.flatMap(user -> {
            // Assuming LegalRepresentativeRepository has a method to find by User entity
            Optional<LegalRepresentative> lrOptional = legalRepresentativeRepository.findByUser(user);
            return lrOptional.map(lr -> {
                // Map LegalRepresentative entity to UserRepresentativeDto
                // Adjust this constructor call based on your actual UserRepresentativeDto fields
                // Based on API doc example: "full_name", "position", "corporate_email", "contact_phone"
                return new UserRepresentativeDto(lr.getFullName(), lr.getPosition(), lr.getCorporateEmail(), lr.getContactPhone());
            });
        });
    }

    @Override
    public LegalRepresentative save(LegalRepresentative legalRepresentative) {
        log.info("Saving new Legal Representative");
        return legalRepresentativeRepository.save(legalRepresentative);
    }
}