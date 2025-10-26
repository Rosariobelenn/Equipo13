package com.app.pyme_go.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.pyme_go.model.dto.error.ErrorResponse;

import com.app.pyme_go.exception.UserAlreadyExistsException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Map<String, Object> REGISTER_EXAMPLE;

    static {
        REGISTER_EXAMPLE = new LinkedHashMap<>();
        Map<String, String> user = new LinkedHashMap<>();
        user.put("gmail", "correo@ejemplo.com");
        user.put("password", "contraseñaSegura123");
        REGISTER_EXAMPLE.put("user", user);

        Map<String, String> company = new LinkedHashMap<>();
        company.put("business_name", "Mi Empresa S.A.");
        company.put("tax_id", "ABC123456789");
        company.put("company_type", "PYME");
        REGISTER_EXAMPLE.put("company", company);

        Map<String, String> legalRepresentative = new LinkedHashMap<>();
        legalRepresentative.put("full_name", "Juan Pérez");
        legalRepresentative.put("position", "Gerente General");
        legalRepresentative.put("document_type", "Cédula de Ciudadanía");
        legalRepresentative.put("document_number", "123456789");
        legalRepresentative.put("corporate_email", "juan.perez@miempresa.com");
        legalRepresentative.put("contact_phone", "+573001234567");
        REGISTER_EXAMPLE.put("legal_representative", legalRepresentative);

        List<Map<String, String>> documents = new ArrayList<>();
        Map<String, String> document1 = new LinkedHashMap<>();
        document1.put("documentType", "acta constitutiva");
        document1.put("url", "http://example.com/acta.pdf");
        documents.add(document1);
        REGISTER_EXAMPLE.put("documents", documents);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, Object> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String field = error.getField();
            String message = error.getDefaultMessage();
            String[] fieldParts = field.split("\\.");
            Map<String, Object> current = errors;
            for (int i = 0; i < fieldParts.length - 1; i++) {
                current = (Map<String, Object>) current.computeIfAbsent(fieldParts[i], k -> new HashMap<>());
            }
            current.put(fieldParts[fieldParts.length - 1], message);
        });

        Object example = null;
        if (request.getRequestURI().equals("/v1/api/register")) {
            example = REGISTER_EXAMPLE;
        }

        ErrorResponse errorResponse = new ErrorResponse(
                request.getRequestURI(),
                "Validation Error",
                errors,
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                example
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex, HttpServletRequest request) {
        Object example = null;
        if (request.getRequestURI().equals("/v1/api/register")) {
            example = REGISTER_EXAMPLE;
        }

        ErrorResponse errorResponse = new ErrorResponse(
                request.getRequestURI(),
                "Malformed JSON",
                "El JSON enviado tiene un formato incorrecto. Por favor, verifícalo.",
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                example
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                request.getRequestURI(),
                "Unauthorized",
                ex.getMessage(),
                HttpStatus.UNAUTHORIZED.value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                request.getRequestURI(),
                "Conflict",
                ex.getMessage(),
                HttpStatus.CONFLICT.value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                request.getRequestURI(),
                "Internal Server Error",
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}