package com.app.pyme_go.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.pyme_go.model.entity.Company;
import com.app.pyme_go.model.entity.LegalRepresentative;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByLegalRepresentative(LegalRepresentative legalRepresentative);
}
