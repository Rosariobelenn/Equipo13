

## For SME Users

#### Authentication

```
POST /auth/login         → Log in
POST /auth/verify-email  → Verify email
```

#### Registration

```
POST /companies          → Register company
POST /legal-representatives → Register legal representative
POST /users              → Create user (email + password)
```

#### Documents

```
POST /documents          → Upload document
PUT /documents/{id}      → Update document
GET /documents/{id}      → View document
```

#### Bank Account

```
POST /bank-accounts      → Register bank account
```

#### Credit Application

```
POST /credit-applications         → Create credit application
GET /credit-applications          → View all applications of the user
GET /credit-applications/{id}     → View detailed application
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
PUT /admin/documents/{id}/validate → Validate or reject document (with message)
```

---

# API-Rest Documentation

## 🔐 Authentication

**POST /auth/login** → Iniciar sesión

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
    "email": "user@pymego.com",
    "legal_representative_id": 10
  }
}
```
