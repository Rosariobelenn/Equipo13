package com.app.pyme_go.model.dto.user;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String access_token;
    private String token_type = "Bearer";
    private Long expires_in;
    private Object user;  // UserResponse o AdminResponse
}
