package com.app.pyme_go.model.dto.credit;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;

@Getter
@Setter
public class CreditApplicationRequestDto {

    @NotNull(message = "El monto del crédito no puede ser nulo")
    @DecimalMin(value = "0.01", message = "El monto del crédito debe ser mayor que cero")
    private BigDecimal credit_amount;

    @NotNull(message = "El número de cuotas no puede ser nulo")
    @Min(value = 1, message = "El número de cuotas debe ser al menos 1")
    private Integer credit_installment_count;

    @NotBlank(message = "El nombre del banco no puede estar vacío")
    private String bank_name;

    @NotBlank(message = "El tipo de cuenta no puede estar vacío")
    private String bank_type;

    @NotBlank(message = "El CBU/CVU no puede estar vacío")
    private String bank_cbu_cvu;

    @NotBlank(message = "El nombre del titular de la cuenta no puede estar vacío")
    private String bank_holder_name;

    @NotEmpty(message = "La URL de los estados contables no puede estar vacía")
    private String document_financial_statements;

    @NotEmpty(message = "La URL del certificado de ingresos brutos no puede estar vacía")
    private String document_gross_income_certificate;

    @NotEmpty(message = "La URL del extracto bancario no puede estar vacía")
    private String document_statement_file;
}
