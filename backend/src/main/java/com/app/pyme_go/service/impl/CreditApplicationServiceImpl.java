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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

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
            CreditApplicationRequestDto requestDto,
            MultipartFile financialStatements,
            MultipartFile grossIncomeCertificate,
            MultipartFile statementFile) {

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
        try {
            saveDocument(savedApplication, financialStatements, "financial_statements");
            saveDocument(savedApplication, grossIncomeCertificate, "gross_income_certificate");
            saveDocument(savedApplication, statementFile, "statement_file");
        } catch (IOException e) {
            // En una aplicación real, aquí se manejaría la transacción para revertir los cambios.
            throw new RuntimeException("Error al guardar los documentos.", e);
        }

        return savedApplication;
    }

    private void saveDocument(CreditApplication application, MultipartFile file, String documentType) throws IOException {
        if (file == null || file.isEmpty()) {
            return; // O lanzar excepción si el documento es obligatorio
        }

        String filePath = storeFile(file);

        Document doc = new Document();
        doc.setDocumentableId(application.getId());
        doc.setDocumentableType(CreditApplication.class.getSimpleName().toLowerCase());
        doc.setDocumentType(documentType);
        doc.setFilePath(filePath);
        doc.setApproved(false);

        documentRepository.save(doc);
    }

    private String storeFile(MultipartFile file) throws IOException {
        // Lógica para guardar el archivo en el servidor
        Path storageDirectory = Paths.get("uploads/documents").toAbsolutePath().normalize();
        Files.createDirectories(storageDirectory);

        String originalFileName = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        String newFileName = UUID.randomUUID().toString() + fileExtension;

        Path targetLocation = storageDirectory.resolve(newFileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return targetLocation.toString();
    }
}

