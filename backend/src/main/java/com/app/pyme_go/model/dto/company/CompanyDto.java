package com.app.pyme_go.model.dto.company;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto {
    @NotBlank(message = "El nombre de la empresa no puede estar vacío")
    String business_name;
    @NotBlank(message = "El ID de impuestos (tax_id) no puede estar vacío")
    String tax_id;
    @NotBlank(message = "El tipo de empresa no puede estar vacío")
    String company_type;
}
