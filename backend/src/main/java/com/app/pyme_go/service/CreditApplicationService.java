package com.app.pyme_go.service;

import com.app.pyme_go.model.dto.credit.AdminCreditApplicationDetailDto;
import com.app.pyme_go.model.dto.credit.AdminCreditApplicationResponseDto;
import com.app.pyme_go.model.dto.credit.CreditApplicationDetailDto;
import com.app.pyme_go.model.dto.credit.UpdateStatusRequestDto;
import java.util.List;

import com.app.pyme_go.model.dto.credit.CreditApplicationRequestDto;
import com.app.pyme_go.model.dto.credit.CreditApplicationResponseDto;
import com.app.pyme_go.model.entity.CreditApplication;
import org.springframework.data.domain.Page;

public interface CreditApplicationService {
    CreditApplication createCreditApplication(
            CreditApplicationRequestDto requestDto
    );

    List<CreditApplicationResponseDto> getCreditApplicationsForUser(int page, int limit);

    CreditApplicationDetailDto getCreditApplicationById(Long id);

    Page<AdminCreditApplicationResponseDto> getAllCreditApplications(String status, Boolean assignedToMe, int page, int limit);

    AdminCreditApplicationDetailDto getAdminCreditApplicationById(Long id);

    CreditApplication updateCreditApplicationStatus(Long id, UpdateStatusRequestDto requestDto);
}
