package com.app.pyme_go.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthResponseDto {
    private String access_token;
    private String token_type = "Bearer";
    private Long expires_in;
    private Object user; 
}
