package com.app.pyme_go.service.impl;

import com.app.pyme_go.model.dto.credit.CreditApplicationRequestDto;
import com.app.pyme_go.model.entity.*;
import com.app.pyme_go.repository.*;
import com.app.pyme_go.service.CreditApplicationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CreditApplicationServiceImpl implements CreditApplicationService {

    private final CreditApplicationRepository creditApplicationRepository;
    private final BankAccountRepository bankAccountRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public CreditApplicationServiceImpl(CreditApplicationRepository creditApplicationRepository, BankAccountRepository bankAccountRepository, DocumentRepository documentRepository, UserRepository userRepository, CompanyRepository companyRepository) {
        this.creditApplicationRepository = creditApplicationRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    @Transactional
    public CreditApplication createCreditApplication(
            CreditApplicationRequestDto requestDto) {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByGmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        Company company = companyRepository.findByLegalRepresentativeId(user.getId());
        if (company == null) {
            throw new IllegalArgumentException("El usuario no tiene una empresa asociada.");
        }
        

        BankAccount bankAccount = new BankAccount();
        bankAccount.setCompany(company);
        bankAccount.setBankName(requestDto.getBank_name());
        bankAccount.setAccountType(requestDto.getBank_type());
        bankAccount.setCbuCvu(requestDto.getBank_cbu_cvu());
        bankAccountRepository.save(bankAccount);

        // 2. Crear la solicitud de crédito
        CreditApplication creditApplication = new CreditApplication();
        creditApplication.setUser(user);
        creditApplication.setCompany(company);
        creditApplication.setBankAccount(bankAccount);
        creditApplication.setAmount(requestDto.getCredit_amount());
        creditApplication.setInstallmentCount(requestDto.getCredit_installment_count());
        creditApplication.setStatus("pending_review");

        CreditApplication savedApplication = creditApplicationRepository.save(creditApplication);

        // 3. Guardar documentos
        saveDocument(savedApplication, requestDto.getDocument_financial_statements(), "financial_statements");
        saveDocument(savedApplication, requestDto.getDocument_gross_income_certificate(), "gross_income_certificate");
        saveDocument(savedApplication, requestDto.getDocument_statement_file(), "statement_file");

        return savedApplication;
    }

    private void saveDocument(CreditApplication application, String fileUrl, String documentType) {

        Document doc = new Document();
        doc.setDocumentableId(application.getId());
        doc.setDocumentableType(CreditApplication.class.getSimpleName().toLowerCase());
        doc.setDocumentType(documentType);
        doc.setFilePath(fileUrl); // Guardamos la URL directamente
        doc.setApproved(false);

        documentRepository.save(doc);
    }

}
