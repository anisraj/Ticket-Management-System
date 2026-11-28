ALTER TABLE users
    ADD COLUMN age       INT         NULL,
    ADD COLUMN gender    VARCHAR(20) NULL,
    ADD COLUMN mobile    VARCHAR(15) NULL,
    ADD COLUMN is_active BOOLEAN     NOT NULL DEFAULT TRUE,
    ADD CONSTRAINT chk_users_age CHECK (age IS NULL OR age BETWEEN 18 AND 100),
    ADD CONSTRAINT chk_users_gender CHECK (
        gender IS NULL OR gender IN ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY')
    );