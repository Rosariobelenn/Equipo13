package com.app.pyme_go.model.dto.document;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentInfoDto {

    @NotBlank(message = "El tipo de documento no puede estar vacío.")
    private String documentType;

    @NotBlank(message = "La URL del documento no puede estar vacía.")
    private String url;
}
