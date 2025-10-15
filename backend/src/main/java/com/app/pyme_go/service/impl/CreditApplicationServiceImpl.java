package com.app.pyme_go.service.impl;

import com.app.pyme_go.model.dto.credit.CreditApplicationDetailDto;
import com.app.pyme_go.model.dto.credit.CreditApplicationRequestDto;
import com.app.pyme_go.model.dto.credit.CreditApplicationResponseDto;
import com.app.pyme_go.model.entity.*;
import com.app.pyme_go.repository.*;
import com.app.pyme_go.service.CreditApplicationService;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CreditApplicationServiceImpl implements CreditApplicationService {

    private final CreditApplicationRepository creditApplicationRepository;
    private final BankAccountRepository bankAccountRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final LegalRepresentativeRepository legalRepresentativeRepository;

    @Autowired
    public CreditApplicationServiceImpl(CreditApplicationRepository creditApplicationRepository, BankAccountRepository bankAccountRepository, DocumentRepository documentRepository, UserRepository userRepository, CompanyRepository companyRepository, LegalRepresentativeRepository legalRepresentativeRepository) {
        this.creditApplicationRepository = creditApplicationRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.legalRepresentativeRepository = legalRepresentativeRepository;
    }

    @Override
    @Transactional
    public CreditApplication createCreditApplication(
            CreditApplicationRequestDto requestDto) {

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByGmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        LegalRepresentative legalRepresentative = legalRepresentativeRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("El usuario no es un representante legal."));

        Company company = companyRepository.findByLegalRepresentative(legalRepresentative)
                .orElseThrow(() -> new IllegalArgumentException("El representante legal no tiene una empresa asociada."));

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

    @Override
    public List<CreditApplicationResponseDto> getCreditApplicationsForUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByGmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        List<CreditApplication> applications = creditApplicationRepository.findByUser(user);

        return applications.stream()
                .map(app -> new CreditApplicationResponseDto(
                        app.getId(),
                        app.getAmount(),
                        app.getStatus(),
                        app.getCompany().getBusinessName(),
                        app.getCompany().getId(),
                        app.getCreatedAt(),
                        app.getUpdatedAt()
                )).collect(Collectors.toList());
    }

    @Override
    public CreditApplicationDetailDto getCreditApplicationById(Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByGmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        CreditApplication app = creditApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Credit application not found or access denied")); // Using RuntimeException to trigger 404-like response

        // Security Check: Ensure the user is the owner of the application
        if (!app.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Credit application not found or access denied");
        }

        // Find the legal representative to get the name
        LegalRepresentative legalRepresentative = legalRepresentativeRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("Legal representative not found for user"));

        CreditApplicationDetailDto.RequestedByDto requestedByDto = new CreditApplicationDetailDto.RequestedByDto(
                user.getId(),
                legalRepresentative.getFullName(),
                user.getGmail()
        );

        List<CreditApplicationDetailDto.DocumentDto> documentDtos = app.getDocuments().stream()
                .map(doc -> new CreditApplicationDetailDto.DocumentDto(
                        doc.getId(),
                        doc.getFilePath().substring(doc.getFilePath().lastIndexOf("/") + 1), // Simple name extraction
                        doc.getDocumentType(),
                        doc.getFilePath() // URL for download
                )).collect(Collectors.toList());

        return new CreditApplicationDetailDto(
                app.getId(), app.getAmount(), app.getStatus(), app.getCompany().getBusinessName(),
                app.getCompany().getId(), app.getCreatedAt(), app.getUpdatedAt(),
                requestedByDto, documentDtos
        );
    }

    private void saveDocument(CreditApplication application, String fileUrl, String documentType) {

        Document doc = new Document(); // Asumiendo que fileUrl no es nulo
        doc.setDocumentableId(application.getId());
        doc.setDocumentableType(CreditApplication.class.getSimpleName().toLowerCase());
        doc.setDocumentType(documentType);
        doc.setFilePath(fileUrl); // Guardamos la URL directamente
        doc.setApproved(false);

        documentRepository.save(doc);
    }

}
