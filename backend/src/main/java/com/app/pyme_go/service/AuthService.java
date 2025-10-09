package com.app.pyme_go.service;

import com.app.pyme_go.model.dto.user.AuthResponseDto;
import com.app.pyme_go.model.dto.user.UserLoginDto;
import com.app.pyme_go.model.dto.user.UserRegisterDto;

public interface AuthService {

    String authenticate(String username, String password);
    AuthResponseDto registerUser(UserRegisterDto newUserDto);
    AuthResponseDto autenticateUser(UserLoginDto userLoginDto);
}