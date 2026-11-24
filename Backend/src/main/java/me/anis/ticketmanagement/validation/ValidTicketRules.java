package me.anis.ticketmanagement.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TicketRulesValidator.class)
public @interface ValidTicketRules {
    String message() default "Invalid ticket";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
