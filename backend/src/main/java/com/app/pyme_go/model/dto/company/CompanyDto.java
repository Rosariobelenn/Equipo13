package com.app.pyme_go.model.dto.company;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto {
    String business_name; 
    String tax_id; 
    String company_type;
}
