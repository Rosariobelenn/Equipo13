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

    @PostMapping(
            path = "/credit-applications",
            consumes = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> createCreditApplication(
            @Valid @RequestBody CreditApplicationRequestDto requestDto) {
        try {
            CreditApplication application = creditApplicationService.createCreditApplication(requestDto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Solicitud de crédito creada exitosamente.");
            response.put("credit_application_id", application.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            // logger.error("Error creating credit application", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error inesperado al procesar la solicitud: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
