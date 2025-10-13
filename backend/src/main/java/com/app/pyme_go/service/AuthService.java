package com.app.pyme_go.service;

import com.app.pyme_go.model.dto.company.CompanyDto;
import com.app.pyme_go.model.dto.legalrepresentative.LegalRepresentativeDto;
import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;
import com.app.pyme_go.model.dto.user.UserRegisterDto;

public interface AuthService {

    String authenticate(String username, String password);
    AuthResponseDto registerUser(
        UserRegisterDto user,
        LegalRepresentativeDto legalRepresentative, 
        CompanyDto company
        
    );
    AuthResponseDto autenticateUser(UserLoginDto userLoginDto);
}