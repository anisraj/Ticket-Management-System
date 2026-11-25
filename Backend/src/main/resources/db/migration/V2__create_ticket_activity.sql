CREATE TABLE ticket_activity
(
    id         BIGINT       NOT NULL AUTO_INCREMENT,
    ticket_id  BIGINT       NOT NULL,
    actor_id   BIGINT       NOT NULL,
    action     VARCHAR(30)  NOT NULL,
    details    VARCHAR(255) NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_activity_ticket FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE CASCADE,
    CONSTRAINT fk_activity_actor FOREIGN KEY (actor_id) REFERENCES users (id),
    CONSTRAINT chk_activity_action CHECK (action IN ('CREATED', 'STATUS_CHANGED', 'ASSIGNED'))
);

CREATE INDEX idx_activity_created_at ON ticket_activity (created_at);