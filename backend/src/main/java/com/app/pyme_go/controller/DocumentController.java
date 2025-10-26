package com.app.pyme_go.controller;

import com.app.pyme_go.model.dto.document.UpdateDocumentDto;
import com.app.pyme_go.model.dto.document.ValidateDocumentRequestDto;
import com.app.pyme_go.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/v1/api")
@Tag(name = "Document Management", description = "Endpoints para la gestión de documentos.")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @Operation(summary = "Validar o rechazar un documento (Admin)", description = "Permite a un administrador aprobar o rechazar un documento específico. Requiere autenticación y privilegios de administrador.", security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("/admin/documents/{id}/validate")
    public ResponseEntity<?> validateDocument(
            @PathVariable Long id,
            @Valid @RequestBody ValidateDocumentRequestDto requestDto) {
        try {
            var validatedDocument = documentService.validateDocument(id, requestDto);
            var response = Map.of(
                    "message", "Documento validado exitosamente.",
                    "document", validatedDocument);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @Operation(summary = "Actualizar un documento (User)", description = "Un usuario actualiza un documento en espesifico.")
    @PutMapping("/documents/{id}")
    public ResponseEntity<?> updateDocument(
            @PathVariable Long id,
            @RequestBody UpdateDocumentDto documentUpdateDTO) {

        try {
            documentService.updateDocument(id, documentUpdateDTO.getDocument_url());
            return ResponseEntity.ok(Map.of("message", "Documento actualizado exitosamente."));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al actualizar el documento."));
        }
    }

}