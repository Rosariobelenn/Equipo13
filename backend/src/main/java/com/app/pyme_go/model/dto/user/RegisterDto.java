package com.app.pyme_go.model.dto.user;

import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.model.dto.legalrepresentative.LegalRepresentativeDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class RegisterDto {
    
    private UserRegisterDto user;
    private CompanyDto company;
    private LegalRepresentativeDto legal_representative;
    
}
