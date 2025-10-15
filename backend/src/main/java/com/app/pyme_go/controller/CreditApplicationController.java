package com.app.pyme_go.controller;

import com.app.pyme_go.model.dto.credit.CreditApplicationDetailDto;
import com.app.pyme_go.model.dto.credit.CreditApplicationRequestDto;
import com.app.pyme_go.model.dto.credit.CreditApplicationResponseDto;
import com.app.pyme_go.model.entity.CreditApplication;
import com.app.pyme_go.service.CreditApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/api")
public class CreditApplicationController {

    private final CreditApplicationService creditApplicationService;

    @Autowired
    public CreditApplicationController(CreditApplicationService creditApplicationService) {
        this.creditApplicationService = creditApplicationService;
    }

    @Operation(summary = "Crear una solicitud de crédito",
            description = "Crea una nueva solicitud de crédito para la empresa del usuario autenticado. Requiere autenticación.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "201", description = "Solicitud creada exitosamente")
            })
    @PostMapping(
            path = "/credit-applications",
            consumes = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> createCreditApplication(
            @Valid @RequestBody CreditApplicationRequestDto requestDto) {
        try {
            CreditApplication application = creditApplicationService.createCreditApplication(requestDto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Solicitud de crédito creada exitosamente.");
            response.put("credit_application_id", application.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            // logger.error("Error creating credit application", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error inesperado al procesar la solicitud: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @Operation(summary = "Listar solicitudes de crédito del usuario",
            description = "Devuelve una lista de todas las solicitudes de crédito asociadas a la empresa del usuario autenticado. Requiere autenticación.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de solicitudes obtenida",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CreditApplicationResponseDto.class)))
            })
    @GetMapping("/credit-applications")
    public ResponseEntity<List<CreditApplicationResponseDto>> getCreditApplications() {
        List<CreditApplicationResponseDto> applications = creditApplicationService.getCreditApplicationsForUser();
        return ResponseEntity.ok(applications);
    }

    @Operation(summary = "Ver una solicitud de crédito detallada",
            description = "Obtiene los detalles completos de una solicitud de crédito específica que pertenece a la empresa del usuario autenticado. Requiere autenticación.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Detalles de la solicitud obtenidos",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CreditApplicationDetailDto.class))),
                    @ApiResponse(responseCode = "404", description = "Solicitud no encontrada o acceso denegado")
            })
    @GetMapping("/credit-applications/{id}")
    public ResponseEntity<?> getCreditApplicationById(@PathVariable Long id) {
        try {
            CreditApplicationDetailDto application = creditApplicationService.getCreditApplicationById(id);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Credit application not found or access denied");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

}
