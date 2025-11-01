package com.app.pyme_go.model.dto.legalrepresentative;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRepresentativeDto {

    private String full_name;
    private String position;
    private String corporate_email;
    private String contact_phone;
 
}