
## APi desing 

## For Users

#### Authentication

```
POST /login               → Log in
POST /register            → Register
POST /auth/verify-email   → Verify email
```

#### Users

```
GET /user/{id}           -> View all user info 
```

#### Documents

```
POST /documents          → Upload document
PUT /documents/{id}      → Update document
GET /documents/{id}      → View document
```


#### Credit Application

```
POST /credit-applications          → Create credit application (includes bank account and documents)
GET /credit-applications           → View all applications of the user
GET /credit-applications/{id}      → View detailed application
PUT /credit-applications/{id}/sign → Digitally sign application
```

---

## For Operator "Administrator"

#### Application Management

```
GET /admin/credit-applications               → List all applications (with status filters)
GET /admin/credit-applications/{id}          → View application in detail
PUT /admin/credit-applications/{id}/status   → Update application status
```

#### Document Management

```
PUT /admin/documents/{id}/validate           → Validate or reject document (with message)
```

---

# API-Rest Documentation

## 🔐 Authentication

### POST /auth/login → Iniciar sesión

**Descripción:**
Permite a un usuario autenticarse en el sistema con su correo y contraseña.
Devuelve un token JWT (o similar) que se usará en todas las llamadas protegidas de la API.

### Request (JSON):

```json
{
  "email": "user@pymego.com",
  "password": "12345678"
}
```

### Response 200 (JSON):

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": 100,
    "name": "user name "
  }
}
```

---

### POST /auth/verify-email → Verificar correo electrónico

**Descripción:**
Permite a un usuario confirmar su dirección de correo electrónico. El usuario debe proporcionar el token de verificación que recibió por email. El backend utilizará este token para identificar al usuario y validar su correo.

### Request (JSON):

```json
{
  "token": "123456"
}
```

### Response 200 (JSON):

```json
{
  "message": "Correo electrónico verificado exitosamente."
}
```

### Response 400 (JSON) - Token inválido o expirado:

```json
{
  "error": "Token de verificación inválido"
}
```

---

## 📝 Registro

**Descripción:**
Permite  registrar un nuevo usuario con sus datos y los datos de la empresa

### Request (JSON):

```
POST /register 

{
  "user": {
    "gmail": "example@gmail.com",
    "password": "12345678"
  },
  "company": {
    "business_name": "pyme_go",
    "tax_id": "12345",
    "company_type": "Money"
  },
  "legal_representative": {
    "full_name": "Example",
    "position": "Manager",
    "document_type": "CD",
    "document_number": "1234",
    "corporate_email": "example@gmail.com",
    "contact_phone": "12345"
  }
}
```


**POST /users** → Crear usuario (email + contraseña)

**Descripción:**
Crea una nueva cuenta de usuario en el sistema. Este es el primer paso para que un representante legal pueda registrar una empresa. Tras el registro exitoso, el sistema enviará un correo de verificación.

### Request (JSON):

```json
{
  "email": "representante@empresa.com",
  "password": "unaContraseñaSegura123"
}
```

### Response 201 (JSON) - Creado exitosamente:

```json
{
  "message": "Usuario creado exitosamente. Por favor, verifica tu correo electrónico.",
  "user": {
    "id": 101,
    "email": "representante@empresa.com"
  }
}
```

### Response 400 (JSON) - Correo ya en uso:

```json
{
  "error": "El correo electrónico ya está en uso."
}
```

# Get info from a user 
### GET /user/{id} → View user info

Description:
Returns the full information of a specific user (legal representative).
Requires authentication.

Path Parameter:

id (integer) — User ID.

Response 200 (JSON)
```
{
  "full_name": "Juan Pérez",
  "position": "Gerente General",
  "corporate_email": "jperez@miempresa.com",
  "contact_phone": "+54 9 11 5555 5555"
}
```
Response 404 (JSON)
```
{
  "error": "User not found"
}
```

Response 401 (JSON)

```
{
  "error": "Unauthorized"
}
```


---

## 📄 Documentos

### POST /documents → Subir un documento

**Descripción:**
Sube un nuevo documento y lo asocia a una entidad específica (como una `company` o una `credit_application`). 
El `documentable_id` se obtiene de la respuesta de la API al crear la entidad correspondiente (ej. `POST /companies`).

### Request (Campos a enviar en `multipart/form-data`):

```json
{
  "file": "balance_2023.pdf)",
  "document_type": "balance_sheet",
  "documentable_id": 5,
  "documentable_type": "company"
}
```

### Response 201 (JSON) - Creado exitosamente:

```json
{
  "message": "Documento subido exitosamente.",
  "document": {
    "id": 55,
    "document_type": "balance_sheet",
    "file_path": "/storage/documents/balance_2023_xyz.pdf",
    "approved": false,
    "documentable_id": 5,
    "documentable_type": "company"
  }
}
```

### Response 400 (JSON) - Datos faltantes:

```json
{
  "error": "Faltan campos requeridos. Asegúrate de incluir file, document_type, documentable_id y documentable_type."
}
```

---

### GET /documents/{id} → Ver un documento

**Descripción:**
Obtiene la información de un documento específico, incluyendo una URL segura para su descarga. Requiere autenticación y que el usuario tenga permisos para ver el documento.

### Response 200 (JSON) - Encontrado:

```json
{
  "id": 55,
  "document_type": "balance_sheet",
  "file_path": "/storage/documents/balance_2023_xyz.pdf",
  "download_url": "https://api.pymego.com/storage/temp/some-secure-link",
  "approved": false,
  "message": null,
  "created_at": "2023-10-27T10:00:00Z"
}
```

### Response 404 (JSON) - No encontrado:

```json
{
  "error": "Documento no encontrado."
}
```

---

### PUT /documents/{id} → Actualizar un documento

**Descripción:**
Permite al usuario reemplazar un documento existente, típicamente uno que fue rechazado por un operador. Requiere autenticación.


### Request:

```json
{
  "file": "balance_2023_v2.pdf"
}
```

### Response 200 (JSON) - Actualizado exitosamente:

```json
{
  "message": "Documento actualizado exitosamente.",
  "document": {
    "id": 55,
    "file_path": "/storage/documents/balance_2023_v2_abc.pdf",
    "approved": false,
    "message": null
  }
}
```


### Response 403 (JSON) - No autorizado:

```json
{
  "error": "No tienes permiso para actualizar este documento."
}
```

---

## 💰 Solicitud de Crédito

### POST /credit-applications → Crear una solicitud de crédito

**Descripción:**
Crea una nueva solicitud de crédito. La petición incluye los detalles del crédito, la información de una nueva cuenta bancaria y los documentos requeridos, todo en una sola operación.

Esta operación debe ser realizada por un usuario autenticado que sea representante legal de una empresa ya registrada. El backend asociará la solicitud a la empresa del usuario automáticamente. 

### Request 

```json
{
  "credit_amount": 50000.00,
  "credit_installment_count": 24,
  "bank_name": "Banco Pymego",
  "bank_type": "Caja de Ahorro",
  "bank_cbu_cvu": "0170213240000012345678",
  "bank_holder_name": "Juan Pérez",
  "document_financial_statements": "(Archivo binario de estados contables)",
  "document_gross_income_certificate": "(Archivo binario de certificado de IIBB)",
  "document_statement_file": "(Archivo binario de extracto bancario)"
}
```

### Response 201 (JSON) - Creado exitosamente:

**La respuesta incluye un resumen completo de la solicitud creada, con los datos de la empresa, el representante y los documentos asociados.**

```json
{
  "message": "Solicitud de crédito creada exitosamente.",
  "credit_application": {
    "id": 1,
    "amount": "50000.00",
    "installment_count": 24,
    "status": "pending_review",
    "created_at": "2023-10-28T12:00:00Z",
    "company": {
      "reference_number": 5,
      "business_name": "Mi Empresa S.A.",
      "tax_id": "30-12345678-9",
      "company_type": "Sociedad Anónima"
    },
    "legal_representative": {
      "full_name": "Juan Pérez"
    },
    "bank_account": {
      "bank_name": "Banco Pymego",
      "account_type": "Caja de Ahorro",
      "cbu_cvu": "**********************"
    },
    "documents_count": 3,
    "documents": [
      {
        "id": 55,
        "name": "balance_2023_xyz.pdf",
        "document_type": "balance_sheet"
      },
      {
        "id": 56,
        "name": "tax_statement_2023_abc.pdf",
        "document_type": "tax_statement"
      },
      {
        "id": 57,
        "name": "company_statute_v1.pdf",
        "document_type": "company_statute"
      }
    ]
  }
}
```


## GET /credit-applications → Listar solicitudes de crédito

Descripción:
Devuelve una lista completa de todas las solicitudes de crédito asociadas a la empresa del usuario autenticado.
Incluye información detallada de cada solicitud, como datos del solicitante, documentos y comentarios.
Requiere autenticación.

Query Parameters (Opcional):

status (string): Filtra las solicitudes por estado.
Valores posibles: pending_review, approved, rejected, requires_changes.

Response 200 (JSON) - Lista de solicitudes detalladas:

```json 


{
  "credit_applications": [
    {
      "id": 1,
      "amount": "50000.00",
      "status": "pending_review",
      "company_name": "Mi Empresa S.A.",
      "company_id": 42,
      "created_at": "2023-10-28T12:00:00Z",
      "updated_at": "2023-11-02T15:30:00Z",
      "requested_by": {
        "id": 12,
        "name": "Juan Pérez",
        "email": "juan.perez@miempresa.com"
      },
      "documents": [
        {
          "id": 7,
          "name": "balance_general.pdf",
          "type": "financial_statement",
          "url": "https://api.example.com/uploads/balance_general.pdf"
        },
        {
          "id": 8,
          "name": "identificacion_representante.pdf",
          "type": "identity_document",
          "url": "https://api.example.com/uploads/identificacion_representante.pdf"
        }
      ],
      "comments": [
        {
          "id": 3,
          "author": "Operador 1",
          "message": "Falta el estado de resultados actualizado.",
          "created_at": "2023-11-01T09:00:00Z"
        }
      ]
    },
    {
      "id": 2,
      "amount": "100000.00",
      "status": "approved",
      "company_name": "Mi Empresa S.A.",
      "company_id": 42,
      "created_at": "2023-11-15T09:30:00Z",
      "updated_at": "2023-11-20T10:00:00Z",
      "requested_by": {
        "id": 12,
        "name": "Juan Pérez",
        "email": "juan.perez@miempresa.com"
      },
      "documents": [],
      "comments": []
    }
  ]
}

```

Response 200 (vacía):
Si el usuario no tiene solicitudes.

```json
{
  "credit_applications": []
}
```



## GET /credit-applications/{id} → View detailed application

GET /credit-applications/{id} → View detailed application

Description:
Retrieves the full details of a specific credit application belonging to the authenticated user’s company.
Requires authentication.

Path Parameter:

id (integer): Unique identifier of the credit application.

Response 200 (JSON) - Application details:

```json 
{
  "id": 1,
  "amount": "50000.00",
  "status": "pending_review",
  "company_name": "Mi Empresa S.A.",
  "company_id": 42,
  "created_at": "2023-10-28T12:00:00Z",
  "updated_at": "2023-11-02T15:30:00Z",
  "requested_by": {
    "id": 12,
    "name": "Juan Pérez",
    "email": "juan.perez@miempresa.com"
  },
  "documents": [
    {
      "id": 7,
      "name": "balance_general.pdf",
      "type": "financial_statement",
      "url": "https://api.example.com/uploads/balance_general.pdf"
    },
    {
      "id": 8,
      "name": "identificacion_representante.pdf",
      "type": "identity_document",
      "url": "https://api.example.com/uploads/identificacion_representante.pdf"
    }
  ],
  "comments": [
    {
      "id": 3,
      "author": "Operador 1",
      "message": "Falta el estado de resultados actualizado.",
      "created_at": "2023-11-01T09:00:00Z"
    }
  ]
}
```



Response 404 (JSON):
Returned when the specified credit application does not exist or the user is not authorized to access it.
```json 
{
  "error": "Credit application not found or access denied"
}
```



## PUT /credit-applications/{id}/sign → Digitally sign application

Description:
Digitally signs a specific credit application belonging to the authenticated user’s company.
Once signed, the application’s status is updated to signed, and the digital signature metadata is recorded.
Requires authentication.

Path Parameter:

id (integer): Unique identifier of the credit application to be signed.

Request Body (JSON):
```json

{
  "signature": "MIICXQIBAAKBgQDvD2lRZVY0vT6y0...",
  "signed_at": "2023-11-05T14:22:00Z"
}
```

Fields:

signature (string, required): Base64-encoded digital signature generated by the user’s private key.

signed_at (string, optional): ISO8601 timestamp of when the signature was created (defaults to server time).

Response 200 (JSON):
```json
{
  "id": 1,
  "status": "signed",
  "signed_at": "2023-11-05T14:22:00Z",
  "signed_by": {
    "id": 12,
    "name": "Juan Pérez",
    "email": "juan.perez@miempresa.com"
  },
  "signature_metadata": {
    "algorithm": "RSA-SHA256",
    "signature_hash": "b1a8f9c4e45a3f...",
    "verified": true
  },
  "message": "Credit application successfully signed."
}
```

Response 400 (JSON):
Returned if the signature is invalid or the request is malformed.

```json 
{
  "error": "Invalid or missing digital signature"
}
```

Response 403 (JSON):
Returned if the user is not authorized to sign the application (e.g., already signed or not owned by their company).

```json
{
  "error": "Not authorized to sign this application"
}
```



## GET /admin/credit-applications → List all applications (with status filters)

Description:
Retrieves a list of all credit applications in the system.
This endpoint is restricted to admin or operator users and supports filters by application status and assigned operator.
Requires authentication and admin privileges.


### Query Parameters (Opcional):

| Parámetro      | Tipo    | Descripción                                                                                             | Ejemplo                  |
|----------------|---------|---------------------------------------------------------------------------------------------------------|--------------------------|
| `status`       | string  | Filtra las solicitudes por su estado actual. Valores posibles: `all`, `pending`, `under_review`, `approved`, `rejected` | `?status=approved`       |
| `assigned_to_me` | boolean | Si es `true`, devuelve solo las solicitudes asignadas actualmente al administrador/operador autenticado. | `?assigned_to_me=true`   |
| `page`         | integer | Número de página para la paginación.                                                                    | `?page=1`                |
| `limit`        | integer | Número de registros por página.                                                                         | `?limit=20`              |



### Comportamiento de los Filtros de Estado:

| Filtro         | Descripción                                                                      | Petición de Ejemplo                               |
|----------------|----------------------------------------------------------------------------------|---------------------------------------------------|
| `all`          | Devuelve todas las solicitudes en el sistema (predeterminado si no se especifica). | `GET /admin/credit-applications?status=all`       |
| `pending`      | Devuelve solo las solicitudes que esperan una revisión inicial.                  | `GET /admin/credit-applications?status=pending`     |
| `under_review` | Devuelve las solicitudes que están siendo evaluadas por un operador.             | `GET /admin/credit-applications?status=under_review`|
| `approved`     | Devuelve todas las solicitudes de crédito aprobadas.                             | `GET /admin/credit-applications?status=approved`    |
| `rejected`     | Devuelve las solicitudes que han sido rechazadas.                                | `GET /admin/credit-applications?status=rejected`    |
| `assigned_to_me` | Devuelve las solicitudes asignadas al administrador/operador que ha iniciado sesión. | `GET /admin/credit-applications?assigned_to_me=true`|


Response 200 (JSON):
```json
{
  "credit_applications": [
    {
      "id": 12,
      "amount": "75000.00",
      "status": "under_review",
      "created_at": "2023-11-05T09:30:00Z",
      "company": {
        "business_name": "Comercial Andina S.R.L.",
        "tax_id": "30-87654321-0",
        "company_type": "Sociedad de Responsabilidad Limitada"
      },
      "legal_representative": {
        "full_name": "Carlos Rodriguez",
        "position": "Socio Gerente",
        "document_type": "DNI",
        "document_number": "23456789",
        "corporate_email": "carlos.rodriguez@comercialandina.com",
        "contact_phone": "+5491198765432"
      },
      "assigned_to": {
        "id": 5,
        "name": "Carlos",
      }
    },
    {
      "id": 13,
      "amount": "100000.00",
      "status": "approved",
      "created_at": "2023-11-02T10:15:00Z",
      "company": {
        "business_name": "Tecnoparts S.A.",
        "tax_id": "30-11223344-5",
        "company_type": "Sociedad Anónima"
      },
      "legal_representative": {
        "full_name": "Ana Gómez",
        "position": "Presidenta",
        "document_type": "DNI",
        "document_number": "34567890",
        "corporate_email": "ana.gomez@tecnoparts.com",
        "contact_phone": "+5491187654321"
      },
      "assigned_to": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}

 ```


Response 403 (JSON):
```json
{
  "error": "Access denied. Admin privileges required."
}
```

---

### GET /admin/credit-applications/{id} → Ver una solicitud en detalle

**Descripción:**
Recupera la información detallada completa de una solicitud de crédito específica.
Este endpoint está destinado a administradores y analistas de crédito, proporcionando todos los datos del solicitante, documentos, comentarios e información de asignación.
Requiere autenticación y privilegios de administrador.

### Path Parameter:

*   `id` (integer): Identificador único de la solicitud de crédito a recuperar.

### Response 200 (JSON) – Información detallada de la solicitud:

```json
{
  "id": 15,
  "amount": "150000.00",
  "installment_count": 12,
  "status": "under_review",
  "created_at": "2023-11-03T12:15:00Z",
  "updated_at": "2023-11-07T09:00:00Z",
  "company": {
    "business_name": "InnovaTech S.A.",
    "tax_id": "20114589632",
    "company_type": "Sociedad Anónima"
  },
  "legal_representative": {
    "full_name": "Juan Pérez",
    "position": "Gerente Financiero",
    "document_type": "DNI",
    "document_number": "45678901",
    "corporate_email": "juan.perez@innovatech.com",
    "contact_phone": "+51 987654321"
  },
  "bank_account": {
    "bank_name": "Banco de Crédito",
    "account_type": "Cuenta Corriente",
    "cbu_cvu": "**********************"
  },
  "documents": [
    {
      "id": 21,
      "document_type": "financial_statement",
      "file_path": "/storage/documents/balance_2023.pdf",
      "approved": true,
      "message": null
    },
    {
      "id": 22,
      "document_type": "identity_document",
      "file_path": "/storage/documents/dni_representante.pdf",
      "approved": false,
      "message": "La firma no es legible."
    }
  ],
  "comments": [
    {
      "id": 8,
      "author": "Admin Analyst",
      "message": "Verificar ingresos netos, parecen inconsistentes con el flujo de caja.",
      "created_at": "2023-11-06T10:45:00Z"
    }
  ],
  "assigned_to": {
    "id": 5,
    "name": "Admin User"
  }
}
```

### Response 404 (JSON):

```json
{
  "error": "Solicitud de crédito no encontrada."
}
```

### Response 403 (JSON):

```json
{
  "error": "Acceso denegado. Se requieren privilegios de administrador."
}
```

---

### PUT /admin/credit-applications/{id}/status → Actualizar estado de la solicitud

**Descripción:**
Permite a un administrador u operador actualizar el estado de una solicitud de crédito. Esto se usa para aprobar, rechazar o solicitar cambios en una solicitud.
Requiere autenticación y privilegios de administrador.

### Path Parameter:

*   `id` (integer): Identificador único de la solicitud de crédito a actualizar.

### Request (JSON):

```json
{
  "status": "approved",
  "message": "La solicitud ha sido aprobada. El desembolso se realizará en las próximas 24 horas."
}
```

**Campos del Request:**

| Campo     | Tipo   | Descripción                                                                                             |
|-----------|--------|---------------------------------------------------------------------------------------------------------|
| `status`  | string | El nuevo estado de la solicitud. Valores posibles: `approved`, `rejected`, `requires_changes`.          |
| `message` | string | (Opcional) Un mensaje para el usuario, útil para explicar el motivo de un rechazo o los cambios requeridos. |

### Response 200 (JSON) – Actualizado exitosamente:

Devuelve el objeto completo de la solicitud de crédito con su nuevo estado.

```json
{
  "message": "Estado de la solicitud actualizado exitosamente.",
  "credit_application": {
    "id": 15,
    "amount": "150000.00",
    "status": "approved",
    "created_at": "2023-11-03T12:15:00Z",
    "updated_at": "2023-11-08T11:20:00Z",
    "company": {
      "business_name": "InnovaTech S.A.",
      "tax_id": "20114589632",
      "company_type": "Sociedad Anónima"
    },
    "legal_representative": {
      "full_name": "Juan Pérez",
      "position": "Gerente Financiero",
      "document_type": "DNI",
      "document_number": "45678901"
    }
  }
}
```

### Response 400 (JSON) - Datos inválidos:

```json
{
  "error": "Estado inválido. Los valores permitidos son: approved, rejected, requires_changes."
}
```

### Response 404 (JSON) - No encontrado:

```json
{
  "error": "Solicitud de crédito no encontrada."
}
```

---

#### Document Management

### PUT /admin/documents/{id}/validate → Validar o rechazar un documento

**Descripción:**
Permite a un administrador u operador aprobar o rechazar un documento específico. Se puede incluir un mensaje para notificar al usuario, especialmente en caso de rechazo.
Requiere autenticación y privilegios de administrador.

### Path Parameter:

*   `id` (integer): Identificador único del documento a validar.

### Request (JSON):

```json
{
  "approved": false,
  "message": "La foto del DNI no es clara. Por favor, sube una nueva imagen."
}
```

**Campos del Request:**

| Campo     | Tipo    | Descripción                                                                                             |
|-----------|---------|---------------------------------------------------------------------------------------------------------|
| `approved`| boolean | `true` para aprobar el documento, `false` para rechazarlo.                                              |
| `message` | string  | (Opcional) Un mensaje para el usuario, útil para explicar el motivo de un rechazo o los cambios requeridos. |

### Response 200 (JSON) – Validado exitosamente:

```json
{
  "message": "Documento validado exitosamente.",
  "document": {
    "id": 21,
    "approved": false,
    "message": "La foto del DNI no es clara. Por favor, sube una nueva imagen."
  }
}
```

### Response 400 (JSON) - Datos inválidos:

```json
{
  "error": "El campo 'approved' es requerido y debe ser un booleano."
}
```

### Response 404 (JSON) - No encontrado:

```json
{
  "error": "Documento no encontrado."
}
```

