package com.app.pyme_go.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.pyme_go.model.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long>{
    Company findByLegalRepresentativeId(Long legalRepresentativeId);
} 
    