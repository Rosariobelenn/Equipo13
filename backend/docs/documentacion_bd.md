

### Tuplas del los datos del sistema


```
company( 
    business_name, 
    tax_id, 
    company_type
)

legal_representative( 
    full_name, 
    position, 
    document_type, 
    document_number, 
    corporate_email, 
    contact_phone
)

user(
    email, 
    password
)

bank_account( 
    bank_name, 
    account_type, 
    cbu_cvu
)

credit_application(
    amount, 
    installment_count, 
    status, 
    digital_signature
)

document(
    document_type, 
    file,
    approved, 
    message
)

```


## Relaciones en entre los datos.


```
users {
   int id         PK
   varchar email
   varchar password
   timestamp email_verified_at
   varchar(6) verification_token
   timestamp verification_token_expires_at
   timestamp created_at
   timestamp updated_at
}

legal_representatives {
   int id PK
   int user_id FK -> users.id
   varchar full_name
   varchar position
   varchar document_type
   varchar document_number
   varchar corporate_email
   varchar contact_phone
   timestamp created_at
   timestamp updated_at
}

companies {
   int id PK
   int legal_representative_id FK -> legal_representatives.id
   varchar business_name
   varchar tax_id
   varchar company_type
   timestamp created_at
   timestamp updated_at
}

bank_accounts {
   int id PK
   int company_id FK -> companies.id
   varchar bank_name
   varchar account_type
   varchar cbu_cvu
   timestamp created_at
   timestamp updated_at
}

credit_applications {
   int id PK
   int user_id FK -> users.id
   int company_id FK -> companies.id
   int bank_account_id FK -> bank_accounts.id
   decimal amount
   int installment_count
   varchar status
   text digital_signature
   timestamp signed_at
   timestamp created_at
   timestamp updated_at
}

documents {
   int id PK
   int documentable_id
   varchar documentable_type
   varchar document_type
   varchar file_path
   boolean approved
   text message
   timestamp created_at
   timestamp updated_at
}


```