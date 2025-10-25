package com.app.pyme_go.service;

import com.app.pyme_go.model.dto.legalrepresentative.UserRepresentativeDto;
import java.util.Optional;
import com.app.pyme_go.model.entity.LegalRepresentative;

public interface LegalRepresentativeService {
    // Returns an Optional<UserRepresentativeDto> to indicate that a representative might not be found.
    Optional<UserRepresentativeDto> findById(Long userId);

    LegalRepresentative save(LegalRepresentative legalRepresentative);
}