package com.app.pyme_go.model.dto.legalrepresentative;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LegalRepresentativeDto {
    String full_name; 
    String position;
    String document_type; 
    String document_number; 
    String corporate_email; 
    String contact_phone; 
}
