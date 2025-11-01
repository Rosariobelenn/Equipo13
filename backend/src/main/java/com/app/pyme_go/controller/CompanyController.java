package com.app.pyme_go.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.model.dto.user.MeDto;
import com.app.pyme_go.model.entity.Company;
import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.UserRepository;
import com.app.pyme_go.service.AuthService;
import com.app.pyme_go.service.CompanyService;
import com.app.pyme_go.service.LegalRepresentativeService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/v1/api/company")
public class CompanyController {

  

    private final AuthService authService;
    private final UserRepository userRepository;
    private final LegalRepresentativeService legalRepresentativeService;
    private final CompanyService companyService;

    public CompanyController(
            AuthService authService,
            UserRepository userRepository,
            LegalRepresentativeService legalRepresentativeService,
            CompanyService companyService) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.legalRepresentativeService = legalRepresentativeService;
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

    @Tag(name = "Company info")
    @GetMapping("/me/{id}")
    public ResponseEntity<?> me(
            @PathVariable Long id,
            Authentication authentication) {

        String authenticatedUserEmail = authentication.getName();
        Optional<User> authenticatedUserOptional = userRepository.findByGmail(authenticatedUserEmail);
        if (authenticatedUserOptional.isEmpty()) {
            throw new UsernameNotFoundException("Authenticated user not found in database");
        }

        User authenticatedUser = authenticatedUserOptional.get();

        if (!authenticatedUser.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access denied: you can only view your own data"));
        }

        Long userId = authenticatedUser.getId();

        Company company = companyService.getCompanyByUserId(userId);

        CompanyDto companyDto = new CompanyDto();
        companyDto.setBusiness_name(company.getBusinessName());
        companyDto.setCompany_type(company.getCompanyType());
        companyDto.setTax_id(company.getTaxId());

        MeDto meDto = new MeDto();
        meDto.setId(userId);
        meDto.setEmail(authenticatedUserEmail);
        meDto.setCompany(companyDto);

        return ResponseEntity.ok(meDto);

    }


}
