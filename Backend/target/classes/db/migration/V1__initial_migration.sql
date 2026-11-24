CREATE TABLE users
(
    id         BIGINT       NOT NULL AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NULL,          -- NULL for Google-only
    role       VARCHAR(20)  NOT NULL,
    google_sub VARCHAR(255) NULL,          -- Google account id
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uq_users_email UNIQUE (email),
    CONSTRAINT uq_users_google_sub UNIQUE (google_sub),
    CONSTRAINT chk_users_role CHECK (role IN ('ADMIN', 'USER'))
);

CREATE TABLE tickets
(
    id                 BIGINT        NOT NULL AUTO_INCREMENT,
    title              VARCHAR(80)   NOT NULL,
    status             VARCHAR(20)   NOT NULL DEFAULT 'Open',
    type               VARCHAR(20)   NOT NULL,
    priority           VARCHAR(20)   NOT NULL,
    description        VARCHAR(500)  NOT NULL,
    due_date           DATE          NULL,
    escalation_date    DATE          NULL,
    steps_to_reproduce VARCHAR(1000) NULL,
    manager_email      VARCHAR(255)  NULL,
    justification      VARCHAR(1000) NULL,
    created_by         BIGINT        NOT NULL,
    created_at         DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uq_tickets_title UNIQUE (title),
    CONSTRAINT fk_tickets_created_by FOREIGN KEY (created_by) REFERENCES users (id),
    CONSTRAINT chk_tickets_status CHECK (status IN ('Open', 'InProgress', 'Closed', 'Blocked')),
    CONSTRAINT chk_tickets_type CHECK (type IN ('BUG', 'FEATURE', 'ACCESS_REQUEST')),
    CONSTRAINT chk_tickets_priority CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    CONSTRAINT chk_tickets_dates CHECK (due_date IS NULL OR escalation_date IS NULL OR escalation_date <= due_date)
);

CREATE INDEX idx_tickets_created_by ON tickets (created_by);
CREATE INDEX idx_tickets_status ON tickets (status);

CREATE TABLE ticket_watchers
(
    ticket_id BIGINT       NOT NULL,
    email     VARCHAR(255) NOT NULL,
    PRIMARY KEY (ticket_id, email),        -- same email cannot be added twice to one ticket
    CONSTRAINT fk_ticket_watchers_ticket FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE CASCADE
);