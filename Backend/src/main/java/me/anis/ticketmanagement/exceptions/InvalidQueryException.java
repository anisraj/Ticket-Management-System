package me.anis.ticketmanagement.exceptions;

import lombok.Getter;

@Getter
public class InvalidQueryException extends RuntimeException {
    private final String field;

    public InvalidQueryException(String field, String message) {
        super(message);
        this.field = field;
    }
}
