package com.app.pyme_go.model.dto.user;

import lombok.Data;

@Data
public class AdminResponseDto {
    private Long id;
    private String name;
    private String email;
    private String role;
} 