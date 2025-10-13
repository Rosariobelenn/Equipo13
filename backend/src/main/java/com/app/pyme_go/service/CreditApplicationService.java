package com.app.pyme_go.service;

import com.app.pyme_go.model.dto.credit.CreditApplicationRequestDto;
import com.app.pyme_go.model.entity.CreditApplication;
import org.springframework.web.multipart.MultipartFile;

public interface CreditApplicationService {
    CreditApplication createCreditApplication(
            CreditApplicationRequestDto requestDto,
            MultipartFile financialStatements,
            MultipartFile grossIncomeCertificate,
            MultipartFile statementFile);
}
