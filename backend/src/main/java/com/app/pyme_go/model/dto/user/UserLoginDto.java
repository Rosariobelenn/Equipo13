package com.app.pyme_go.model.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDto {

    @NotBlank(message = "El correo no puede estar vacío")
    @Email(message = "Debe ser una dirección de correo válida")
    private String gmail;
    @NotBlank(message = "La contraseña no puede estar vacía")
    private String password;

}