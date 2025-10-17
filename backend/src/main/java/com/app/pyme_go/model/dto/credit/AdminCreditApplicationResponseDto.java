package com.app.pyme_go.model.dto.credit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCreditApplicationResponseDto {
    private Long id;
    private BigDecimal amount;
    private String status;
    private LocalDateTime created_at;
    private CompanyDto company;
    private LegalRepresentativeDto legal_representative;
    private AssignedToDto assigned_to;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompanyDto {
        private String business_name;
        private String tax_id;
        private String company_type;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LegalRepresentativeDto {
        private String full_name;
        private String position;
        private String document_type;
        private String document_number;
        private String corporate_email;
        private String contact_phone;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AssignedToDto {
        private Long id;
        private String name;
    }
}
