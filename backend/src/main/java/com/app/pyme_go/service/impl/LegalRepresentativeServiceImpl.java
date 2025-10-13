package com.app.pyme_go.service.impl;

import org.springframework.stereotype.Service;

import com.app.pyme_go.model.entity.LegalRepresentative;
import com.app.pyme_go.repository.LegalRepresentativeRepository;
import com.app.pyme_go.service.LegalRepresentativeService;

@Service
public class LegalRepresentativeServiceImpl implements LegalRepresentativeService{

  
    private LegalRepresentativeRepository legalRepresentativeRepository;

    public LegalRepresentativeServiceImpl(LegalRepresentativeRepository legalRepresentativeRepository) {
        this.legalRepresentativeRepository = legalRepresentativeRepository;
    }

    @Override
    public LegalRepresentative save(LegalRepresentative legalRepresentative) {
        return legalRepresentativeRepository.save(legalRepresentative);
       
    }
    
}
