package com.app.pyme_go.model.dto.user;

import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.model.dto.document.DocumentInfoDto;
import com.app.pyme_go.model.dto.legalrepresentative.LegalRepresentativeDto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RegisterDto {

    @NotNull(message = "El objeto 'user' no puede ser nulo.")
    @Valid
    private UserRegisterDto user;

    @NotNull(message = "El objeto 'legal_representative' no puede ser nulo.")
    @Valid
    private LegalRepresentativeDto legal_representative;

    @NotNull(message = "El objeto 'company' no puede ser nulo.")
    @Valid
    private CompanyDto company;

    @NotEmpty(message = "Debe proporcionar al menos un documento.")
    @Valid
    private List<DocumentInfoDto> documents;
}