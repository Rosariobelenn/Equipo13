package com.app.pyme_go.model.dto.credit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCreditApplicationDetailDto {
    private Long id;
    private BigDecimal amount;
    private Integer installment_count;
    private String status;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private CompanyDto company;
    private LegalRepresentativeDto legal_representative;
    private BankAccountDto bank_account;
    private List<DocumentDto> documents;
    private List<CommentDto> comments; // Comment entity/DTO not defined yet
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
    public static class BankAccountDto {
        private String bank_name;
        private String account_type;
        private String cbu_cvu;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DocumentDto {
        private Long id;
        private String document_type;
        private String file_path;
        private Boolean approved;
        private String message;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AssignedToDto {
        private Long id;
        private String name;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CommentDto {
        private Long id;
        private String author;
        private String message;
        private LocalDateTime created_at;
    }
}