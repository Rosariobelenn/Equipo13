package com.app.pyme_go.service.impl;

import com.app.pyme_go.model.dto.credit.*;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
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
    public List<CreditApplicationResponseDto> getCreditApplicationsForUser(int page, int limit) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByGmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // La paginación en Spring Data JPA es base 0, por eso page - 1
        Pageable pageable = PageRequest.of(page - 1, limit);

        Page<CreditApplication> applications = creditApplicationRepository.findByUser(user, pageable);

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

    @Override
    public AdminCreditApplicationDetailDto getAdminCreditApplicationById(Long id) {
        // La autorización de rol 'ADMIN' debería ser manejada por la configuración de seguridad de Spring.
        CreditApplication app = creditApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud de crédito no encontrada."));

        // Mapeo de la Compañía
        Company company = app.getCompany();
        AdminCreditApplicationDetailDto.CompanyDto companyDto = new AdminCreditApplicationDetailDto.CompanyDto(
                company.getBusinessName(), company.getTaxId(), company.getCompanyType()
        );

        // Mapeo del Representante Legal
        LegalRepresentative lr = company.getLegalRepresentative();
        AdminCreditApplicationDetailDto.LegalRepresentativeDto lrDto = new AdminCreditApplicationDetailDto.LegalRepresentativeDto(
                lr.getFullName(), lr.getPosition(), lr.getDocumentType(), lr.getDocumentNumber(),
                lr.getCorporateEmail(), lr.getContactPhone()
        );

        // Mapeo de la Cuenta Bancaria (con CBU/CVU ofuscado)
        BankAccount ba = app.getBankAccount();
        String maskedCbu = ba.getCbuCvu() != null ? "**********************" : null;
        AdminCreditApplicationDetailDto.BankAccountDto bankAccountDto = new AdminCreditApplicationDetailDto.BankAccountDto(
                ba.getBankName(), ba.getAccountType(), maskedCbu
        );

        // Mapeo de Documentos
        List<AdminCreditApplicationDetailDto.DocumentDto> documentDtos = app.getDocuments().stream()
                .map(doc -> new AdminCreditApplicationDetailDto.DocumentDto(
                        doc.getId(), doc.getDocumentType(), doc.getFilePath(), doc.getApproved(), doc.getMessage()
                )).collect(Collectors.toList());

        // Mapeo de Asignado A (si existe)
        AdminCreditApplicationDetailDto.AssignedToDto assignedToDto = null;
        if (app.getAssignedTo() != null) {
            User assignedUser = app.getAssignedTo();
            assignedToDto = new AdminCreditApplicationDetailDto.AssignedToDto(assignedUser.getId(), getUserDisplayName(assignedUser));
        }

        // Mapeo de Comentarios (si existen)
        // TODO: Implementar la lógica de comentarios cuando la entidad Comment esté disponible.
        List<AdminCreditApplicationDetailDto.CommentDto> commentDtos = Collections.emptyList();

        return new AdminCreditApplicationDetailDto(
                app.getId(), app.getAmount(), app.getInstallmentCount(), app.getStatus(),
                app.getCreatedAt(), app.getUpdatedAt(), companyDto, lrDto, bankAccountDto,
                documentDtos,
                commentDtos, assignedToDto
        );
    }

    @Override
    public Page<AdminCreditApplicationResponseDto> getAllCreditApplications(String status, Boolean assignedToMe, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);

        User currentUser = null;
        if (assignedToMe != null && assignedToMe) {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            currentUser = userRepository.findByGmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        }

        CreditApplicationSpecification spec = new CreditApplicationSpecification(status, currentUser);

        Page<CreditApplication> applicationsPage = creditApplicationRepository.findAll(spec, pageable);

        return applicationsPage.map(app -> {
            AdminCreditApplicationResponseDto.CompanyDto companyDto = new AdminCreditApplicationResponseDto.CompanyDto(app.getCompany().getBusinessName(), app.getCompany().getTaxId(), app.getCompany().getCompanyType());

            LegalRepresentative lr = app.getCompany().getLegalRepresentative();
            AdminCreditApplicationResponseDto.LegalRepresentativeDto lrDto = new AdminCreditApplicationResponseDto.LegalRepresentativeDto(lr.getFullName(), lr.getPosition(), lr.getDocumentType(), lr.getDocumentNumber(), lr.getCorporateEmail(), lr.getContactPhone());

            AdminCreditApplicationResponseDto.AssignedToDto assignedToDto = null;
            if (app.getAssignedTo() != null) {
                User assignedUser = app.getAssignedTo();
                assignedToDto = new AdminCreditApplicationResponseDto.AssignedToDto(assignedUser.getId(), getUserDisplayName(assignedUser));
            }

            return new AdminCreditApplicationResponseDto(app.getId(), app.getAmount(), app.getStatus(), app.getCreatedAt(), companyDto, lrDto, assignedToDto);
        });
    }

    @Override
    @Transactional
    public CreditApplication updateCreditApplicationStatus(Long id, UpdateStatusRequestDto requestDto) {
        CreditApplication application = creditApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud de crédito no encontrada."));

        application.setStatus(requestDto.getStatus());

        // TODO: Si se proporciona un mensaje, debería guardarse como un comentario.
        // Esto requiere la implementación de la entidad Comment y su relación con CreditApplication.
        // if (requestDto.getMessage() != null && !requestDto.getMessage().isBlank()) { ... }

        return creditApplicationRepository.save(application);
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

    /**
     * Gets a display name for a user.
     * <p>
     * This is a temporary solution. It attempts to extract a name from the user's email.
     * This should be replaced by a proper 'name' or 'fullName' field in the User entity.
     *
     * @param user The user to get the display name for.
     * @return A display name for the user.
     */
    private String getUserDisplayName(User user) {
        return Optional.ofNullable(user)
                .map(User::getGmail)
                .map(email -> email.split("@")[0])
                .orElse("N/A");
    }
}
