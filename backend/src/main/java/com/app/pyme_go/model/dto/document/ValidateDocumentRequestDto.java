package com.app.pyme_go.model.dto.document;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ValidateDocumentRequestDto {

    @NotNull(message = "El campo 'approved' es requerido y debe ser un booleano.")
    private Boolean approved;

    private String message;

}