package com.app.pyme_go.service;

import com.app.pyme_go.model.dto.credit.CreditApplicationDetailDto;
import java.util.List;

import com.app.pyme_go.model.dto.credit.CreditApplicationRequestDto;
import com.app.pyme_go.model.dto.credit.CreditApplicationResponseDto;
import com.app.pyme_go.model.entity.CreditApplication;

public interface CreditApplicationService {
    CreditApplication createCreditApplication(
            CreditApplicationRequestDto requestDto
    );

    List<CreditApplicationResponseDto> getCreditApplicationsForUser();

    CreditApplicationDetailDto getCreditApplicationById(Long id);
}
