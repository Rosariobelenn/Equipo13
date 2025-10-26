package com.app.pyme_go.model.dto.legalrepresentative;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LegalRepresentativeDto {
    @NotBlank(message = "El nombre completo no puede estar vacío")
    String full_name;
    @NotBlank(message = "El cargo no puede estar vacío")
    String position;
    @NotBlank(message = "El tipo de documento no puede estar vacío")
    String document_type;
    @NotBlank(message = "El número de documento no puede estar vacío")
    String document_number;
    @NotBlank(message = "El correo corporativo no puede estar vacío")
    @Email(message = "El formato del correo corporativo no es válido")
    String corporate_email;
    @NotBlank(message = "El teléfono de contacto no puede estar vacío")
    String contact_phone;
}
