package com.app.pyme_go.service;

import java.util.Optional;

import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.model.dto.legalrepresentative.UserRepresentativeDto;
import com.app.pyme_go.model.entity.Company;

public interface CompanyService {

    Company save(Company company);
    Optional<CompanyDto> findById(Long userId);
} 