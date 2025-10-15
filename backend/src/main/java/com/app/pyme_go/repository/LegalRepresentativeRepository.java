package com.app.pyme_go.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.model.entity.LegalRepresentative;

import java.util.Optional;

@Repository
public interface LegalRepresentativeRepository  extends JpaRepository <LegalRepresentative, Long>{

    Optional<LegalRepresentative> findByUser(User user);
}
