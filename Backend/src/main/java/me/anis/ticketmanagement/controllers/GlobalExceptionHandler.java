package me.anis.ticketmanagement.controllers;

import me.anis.ticketmanagement.exceptions.DuplicateTicketTitleException;
import me.anis.ticketmanagement.exceptions.InvalidQueryException;
import me.anis.ticketmanagement.exceptions.TicketNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException exception) {
        var errors = new HashMap<String, String>();
        exception.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleUnreadableMessage() {
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid request body"));
    }

    @ExceptionHandler(TicketNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleTicketNotFound() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Ticket not found"));
    }

    @ExceptionHandler(DuplicateTicketTitleException.class)
    public ResponseEntity<Map<String, String>> handleDuplicateTitle() {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("title", "A ticket with this title already exists"));
    }

    @ExceptionHandler(InvalidQueryException.class)
    public ResponseEntity<Map<String, String>> handleInvalidQuery(InvalidQueryException ex) {
        return ResponseEntity.badRequest().body(Map.of(ex.getField(), ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, String>> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest().body(Map.of(ex.getName(), "Invalid value"));
    }

}
