package com.app.pyme_go.service;

import com.app.pyme_go.model.dto.document.ValidateDocumentRequestDto;
import com.app.pyme_go.model.entity.Document;

public interface DocumentService {
    Document validateDocument(Long id, ValidateDocumentRequestDto requestDto);
}