package com.app.pyme_go.model.dto.credit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditApplicationResponseDto {
    private Long id;
    private BigDecimal amount;
    private String status;
    private String company_name;
    private Long company_id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}