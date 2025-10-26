package com.app.pyme_go.model.dto.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private String path;
    private String error;
    private Object message;
    private int status;
    private LocalDateTime timestamp;
    private Object example;

    public ErrorResponse() {
        // No-args constructor
    }

    public ErrorResponse(String path, String error, Object message, int status, LocalDateTime timestamp) {
        this.path = path;
        this.error = error;
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
    }

    public ErrorResponse(String path, String error, Object message, int status, LocalDateTime timestamp, Object example) {
        this.path = path;
        this.error = error;
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
        this.example = example;
    }
}