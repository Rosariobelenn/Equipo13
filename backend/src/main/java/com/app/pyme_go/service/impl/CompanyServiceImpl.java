package com.app.pyme_go.service.impl;

import org.springframework.stereotype.Service;

import com.app.pyme_go.model.entity.Company;
import com.app.pyme_go.repository.CompanyRepository;
import com.app.pyme_go.service.CompanyService;

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
    
}
