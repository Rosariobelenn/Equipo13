package com.app.pyme_go.model.dto.user;


import lombok.AllArgsConstructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterDto{

    @NotBlank(message = "El correo no puede estar vacío")
    @Email(message = "Debe ser una dirección de correo válida")
    private String gmail; 
    @NotBlank(message = "La contraseña no puede estar vacía")
    private String password;

}
