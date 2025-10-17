package com.app.pyme_go.model.dto.credit;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdateStatusRequestDto {

    @NotBlank(message = "El estado no puede estar vacío.")
    @Pattern(regexp = "approved|rejected|requires_changes", message = "Estado inválido. Los valores permitidos son: approved, rejected, requires_changes.")
    private String status;

    private String message;
}