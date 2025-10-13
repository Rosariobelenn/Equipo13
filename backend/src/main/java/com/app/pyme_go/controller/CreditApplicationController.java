package com.app.pyme_go.controller;

import com.app.pyme_go.model.dto.credit.CreditApplicationRequestDto;
import com.app.pyme_go.model.entity.CreditApplication;
import com.app.pyme_go.service.CreditApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/api")
public class CreditApplicationController {

    private final CreditApplicationService creditApplicationService;

    @Autowired
    public CreditApplicationController(CreditApplicationService creditApplicationService) {
        this.creditApplicationService = creditApplicationService;
    }

    @PostMapping("/credit-applications")
    public ResponseEntity<?> createCreditApplication(
            @Valid @RequestPart("request") CreditApplicationRequestDto requestDto,
            @RequestPart("document_financial_statements") MultipartFile financialStatements,
            @RequestPart("document_gross_income_certificate") MultipartFile grossIncomeCertificate,
            @RequestPart("document_statement_file") MultipartFile statementFile) {
        try {
            CreditApplication application = creditApplicationService.createCreditApplication(
                    requestDto,
                    financialStatements,
                    grossIncomeCertificate,
                    statementFile
            );
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Solicitud de crédito creada exitosamente.");
            response.put("credit_application_id", application.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

