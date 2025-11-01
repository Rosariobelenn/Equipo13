package com.app.pyme_go.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.model.entity.Company;
import com.app.pyme_go.repository.CompanyRepository;
import com.app.pyme_go.service.CompanyService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CompanyServiceImpl implements CompanyService{

    private CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }


    @Override
    public Company save(Company company) {
        return companyRepository.save(company);
    }

    @Override 
    public Optional<CompanyDto>findById(Long companyId ){

        Optional<Company> company = companyRepository.findById(companyId);

        CompanyDto companyInfo = new CompanyDto(); 
        companyInfo.setBusiness_name(company.get().getBusinessName());
        companyInfo.setTax_id(company.get().getTaxId());
        companyInfo.setCompany_type(company.get().getCompanyType());

        return Optional.ofNullable(companyInfo);

    }

    @Override 
    public Company getCompanyByUserId(Long userId) {
        return companyRepository.findByLegalRepresentative_User_Id(userId)
            .orElseThrow(() -> new EntityNotFoundException("No se encontró empresa para el usuario ID " + userId));
    }
    
}
