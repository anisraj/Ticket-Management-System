ALTER TABLE tickets
    ADD COLUMN assignee_id BIGINT NULL,
    ADD CONSTRAINT fk_tickets_assignee FOREIGN KEY (assignee_id) REFERENCES users (id);