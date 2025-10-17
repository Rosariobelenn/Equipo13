package com.app.pyme_go.repository;

import com.app.pyme_go.model.entity.CreditApplication;
import com.app.pyme_go.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditApplicationRepository extends JpaRepository<CreditApplication, Long>, JpaSpecificationExecutor<CreditApplication> {

    Page<CreditApplication> findByUser(User user, Pageable pageable);
}
