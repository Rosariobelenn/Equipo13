package com.app.pyme_go.service.impl;

import com.app.pyme_go.model.dto.document.ValidateDocumentRequestDto;
import com.app.pyme_go.model.entity.Document;
import com.app.pyme_go.repository.DocumentRepository;
import com.app.pyme_go.service.DocumentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Override
    @Transactional
    public Document validateDocument(Long id, ValidateDocumentRequestDto requestDto) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado."));
        document.setApproved(requestDto.getApproved());
        document.setMessage(requestDto.getMessage());
        return documentRepository.save(document);
    }

    @Override
    @Transactional
    public void updateDocument(Long id, String documentUrl) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado con id: " + id));
                
        document.setFilePath(documentUrl);
        document.setApproved(false); 
        document.setMessage(null);   
        documentRepository.save(document);
    }
}