package com.app.pyme_go.controller;

import com.app.pyme_go.model.dto.document.UpdateDocumentDto;
import com.app.pyme_go.model.dto.document.ValidateDocumentRequestDto;
import com.app.pyme_go.model.entity.Document;
import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.UserRepository;
import com.app.pyme_go.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/v1/api")
public class DocumentController {

    private final DocumentService documentService;
    private final UserRepository userRepository;

    @Autowired
    public DocumentController(DocumentService documentService, UserRepository userRepository) {
        this.documentService = documentService;
        this.userRepository = userRepository;
    }

    @Tag(name = "Document Management (Admin)", description = "Endpoints para la gestión de documentos por parte de administradores.")
    @Operation(summary = "Validar o rechazar un documento", description = "Permite a un administrador aprobar o rechazar un documento específico. Requiere autenticación y privilegios de administrador.", security = @SecurityRequirement(name = "bearerAuth"))
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

    @Tag(name = "Document Management (USER)", description = "Endpoints para la gestion de documentos por parte de usuarios.")
    @Operation(summary = "Actualizar un documento", description = "Un usuario actualiza un documento en espesifico.")
    @PutMapping("/documents/{id}")
    public ResponseEntity<?> updateDocument(
            @PathVariable Long id,
            @RequestBody UpdateDocumentDto documentUpdateDTO) {

        try {
            documentService.updateDocument(id, documentUpdateDTO.getDocument_url());
            return ResponseEntity.ok("Documento actualizado exitosamente.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el documento.");
        }
    }

}