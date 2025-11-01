package com.app.pyme_go.model.dto.user;

import com.app.pyme_go.model.dto.company.CompanyDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@AllArgsConstructor
public class MeDto {
    private Long id;
    private String email;
    private CompanyDto company;
}