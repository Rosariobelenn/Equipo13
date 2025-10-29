package com.app.pyme_go.repository;

import com.app.pyme_go.model.entity.BankAccount;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
    boolean existsByCbuCvu(String cbuCvu);
    Optional<BankAccount> findByCbuCvu(String cbuCvu);
}

