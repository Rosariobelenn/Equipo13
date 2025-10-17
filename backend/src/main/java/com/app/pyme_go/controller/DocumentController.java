package com.app.pyme_go.controller;

import com.app.pyme_go.model.dto.document.ValidateDocumentRequestDto;
import com.app.pyme_go.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/api/admin/documents")
@Tag(name = "Document Management (Admin)", description = "Endpoints para la gestión de documentos por parte de administradores.")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @Operation(summary = "Validar o rechazar un documento",
            description = "Permite a un administrador aprobar o rechazar un documento específico. Requiere autenticación y privilegios de administrador.",
            security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("/{id}/validate")
    public ResponseEntity<?> validateDocument(
            @PathVariable Long id,
            @Valid @RequestBody ValidateDocumentRequestDto requestDto) {
        try {
            var validatedDocument = documentService.validateDocument(id, requestDto);
            var response = Map.of(
                    "message", "Documento validado exitosamente.",
                    "document", validatedDocument
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}