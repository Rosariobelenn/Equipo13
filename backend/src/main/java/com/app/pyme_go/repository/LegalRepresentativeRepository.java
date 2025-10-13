package com.app.pyme_go.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pyme_go.model.entity.LegalRepresentative;

@Repository
public interface LegalRepresentativeRepository  extends JpaRepository <LegalRepresentative, Long>{
    
}
