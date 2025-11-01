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
public class CreditApplicationDetailDto {
    private Long id;
    private BigDecimal amount;
    private String status;
    private String company_name;
    private Long company_id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private RequestedByDto requested_by;
    private List<DocumentDto> documents;
    // private List<CommentDto> comments; // Comment entity/DTO not defined yet

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RequestedByDto {
        private Long id;
        private String name; // Assuming LegalRepresentative's full_name
        private String email;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DocumentDto {
        private Long id;
        private String name; // Assuming file path can be parsed for a name
        private String type;
        private String url;
    }

    // @Data
    // @NoArgsConstructor
    // @AllArgsConstructor
    // public static class CommentDto {
    //     private Long id;
    //     private String author;
    //     private String message;
    //     private LocalDateTime created_at;
    // }
}