package com.app.pyme_go.controller;

import com.app.pyme_go.model.dto.credit.*;
import com.app.pyme_go.model.entity.CreditApplication;
import com.app.pyme_go.service.CreditApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
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

    @Tag(name = "Credit Applications (User)")
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

    @Tag(name = "Credit Applications (User)")
    @Operation(summary = "Listar solicitudes de crédito del usuario",
            description = "Devuelve una lista de todas las solicitudes de crédito asociadas a la empresa del usuario autenticado. Requiere autenticación.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de solicitudes obtenida",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = CreditApplicationResponseDto.class)))
            })
    @GetMapping("/credit-applications")
    public ResponseEntity<List<CreditApplicationResponseDto>> getCreditApplications(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "20") int limit) {
        List<CreditApplicationResponseDto> applications = creditApplicationService.getCreditApplicationsForUser(page, limit);
        return ResponseEntity.ok(applications);
    }

    @Tag(name = "Credit Applications (Admin)")
    @Operation(summary = "Listar todas las solicitudes de crédito (Admin)",
            description = "Recupera una lista de todas las solicitudes de crédito en el sistema. Este endpoint es para administradores y soporta filtros por estado y asignación.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de solicitudes obtenida",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = Page.class))),
                    @ApiResponse(responseCode = "403", description = "Acceso denegado. Se requieren privilegios de administrador.")
            })
    @GetMapping("/admin/credit-applications")
    public ResponseEntity<?> getAllCreditApplications(
            @Parameter(description = "Filtra por estado: all, pending, under_review, approved, rejected") @RequestParam(value = "status", required = false, defaultValue = "all") String status,
            @Parameter(description = "Si es true, devuelve solo las solicitudes asignadas al operador autenticado") @RequestParam(value = "assigned_to_me", required = false) Boolean assignedToMe,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "limit", defaultValue = "20") int limit) {

        Page<AdminCreditApplicationResponseDto> applicationsPage = creditApplicationService.getAllCreditApplications(status, assignedToMe, page, limit);

        Map<String, Object> response = new HashMap<>();
        response.put("credit_applications", applicationsPage.getContent());
        response.put("page", applicationsPage.getNumber() + 1);
        response.put("limit", applicationsPage.getSize());
        response.put("total", applicationsPage.getTotalElements());
        return ResponseEntity.ok(response);
    }

    @Tag(name = "Credit Applications (Admin)")
    @Operation(summary = "Ver una solicitud de crédito en detalle (Admin)",
            description = "Recupera la información detallada completa de una solicitud de crédito específica. Requiere autenticación y privilegios de administrador.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Detalles de la solicitud obtenidos",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = AdminCreditApplicationDetailDto.class))),
                    @ApiResponse(responseCode = "404", description = "Solicitud de crédito no encontrada."),
                    @ApiResponse(responseCode = "403", description = "Acceso denegado. Se requieren privilegios de administrador.")
            })
    @GetMapping("/admin/credit-applications/{id}")
    public ResponseEntity<?> getAdminCreditApplicationById(@PathVariable Long id) {
        try {
            AdminCreditApplicationDetailDto application = creditApplicationService.getAdminCreditApplicationById(id);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) { // Catches not found or access denied
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @Tag(name = "Credit Applications (User)")
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

    @Tag(name = "Credit Applications (Admin)")
    @Operation(summary = "Actualizar estado de la solicitud (Admin)",
            description = "Permite a un administrador actualizar el estado de una solicitud de crédito (aprobar, rechazar, etc.). Requiere autenticación y privilegios de administrador.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Estado actualizado exitosamente"),
                    @ApiResponse(responseCode = "400", description = "Datos inválidos"),
                    @ApiResponse(responseCode = "404", description = "Solicitud de crédito no encontrada.")
            })
    @PutMapping("/admin/credit-applications/{id}/status")
    public ResponseEntity<?> updateCreditApplicationStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequestDto requestDto) {
        try {
            CreditApplication updatedApp = creditApplicationService.updateCreditApplicationStatus(id, requestDto);

            // Mapeo manual para la respuesta, similar a AdminCreditApplicationResponseDto pero sin 'assigned_to'
            AdminCreditApplicationResponseDto.CompanyDto companyDto = new AdminCreditApplicationResponseDto.CompanyDto(
                    updatedApp.getCompany().getBusinessName(),
                    updatedApp.getCompany().getTaxId(),
                    updatedApp.getCompany().getCompanyType()
            );

            AdminCreditApplicationResponseDto.LegalRepresentativeDto lrDto = new AdminCreditApplicationResponseDto.LegalRepresentativeDto(
                    updatedApp.getCompany().getLegalRepresentative().getFullName(),
                    updatedApp.getCompany().getLegalRepresentative().getPosition(),
                    updatedApp.getCompany().getLegalRepresentative().getDocumentType(),
                    updatedApp.getCompany().getLegalRepresentative().getDocumentNumber(),
                    updatedApp.getCompany().getLegalRepresentative().getCorporateEmail(),
                    updatedApp.getCompany().getLegalRepresentative().getContactPhone()
            );

            AdminCreditApplicationResponseDto creditApplication = new AdminCreditApplicationResponseDto(
                    updatedApp.getId(), updatedApp.getAmount(), updatedApp.getStatus(), updatedApp.getCreatedAt(),
                    companyDto, lrDto, null // 'assigned_to' no es parte de esta respuesta según la spec
            );

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Estado de la solicitud actualizado exitosamente.");
            response.put("credit_application", creditApplication);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}
