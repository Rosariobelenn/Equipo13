package com.app.pyme_go.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.service.CompanyService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/v1/api/company")
public class CompanyController {

    private final CompanyService companyService; 

    public CompanyController(CompanyService companyService){
        this.companyService = companyService; 
    }


    @Tag(name = "Company info")
    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminCreditApplicationById(@PathVariable Long id) {
        try {
            Optional<CompanyDto> application = companyService.findById(id);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) { 
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

}
