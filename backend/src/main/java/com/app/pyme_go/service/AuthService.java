package com.app.pyme_go.service;

import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.RegisterDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;


public interface AuthService {

    String authenticate(String username, String password);
    AuthResponseDto registerUser(RegisterDto registerDto);
    AuthResponseDto autenticateUser(UserLoginDto userLoginDto);
}