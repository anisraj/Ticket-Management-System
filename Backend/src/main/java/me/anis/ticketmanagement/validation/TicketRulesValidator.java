package me.anis.ticketmanagement.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import me.anis.ticketmanagement.dtos.ticket.CreateTicketRequest;
import me.anis.ticketmanagement.entities.TicketPriority;
import me.anis.ticketmanagement.entities.TicketType;

import java.util.HashSet;

public class TicketRulesValidator implements ConstraintValidator<ValidTicketRules, CreateTicketRequest> {
    private static final String COMPANY_DOMAIN = "@qburst.com";

    @Override
    public boolean isValid(CreateTicketRequest request, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();
        boolean valid = true;

        if (request.getType() == TicketType.BUG && isBlank(request.getStepsToReproduce())) {
            valid = fail(context, "stepsToReproduce", "Steps to reproduce are required for a bug");
        }

        if (request.getType() == TicketType.ACCESS_REQUEST) {
            var manager = request.getManagerEmail();
            if (isBlank(manager)) {
                valid = fail(context, "managerEmail", "Manager email is required for an access request");
            } else if (!manager.trim().toLowerCase().endsWith(COMPANY_DOMAIN)) {
                valid = fail(context, "managerEmail", "Manager email must be a " + COMPANY_DOMAIN + " address");
            }
        }

        if (request.getPriority() == TicketPriority.CRITICAL && isBlank(request.getJustification())) {
            valid = fail(context, "justification", "Justification is required for critical priority");
        }

        if (request.getDueDate() != null && request.getEscalationDate() != null
                && request.getEscalationDate().isAfter(request.getDueDate())) {
            valid = fail(context, "escalationDate", "Escalation date must be on or before the due date");
        }

        var watchers = request.getWatchers();
        if (watchers != null) {
            var unique = new HashSet<String>();
            for (var email : watchers) {
                if (email != null && !unique.add(email.trim().toLowerCase())) {
                    valid = fail(context, "watchers", "Watchers must be different from each other");
                    break;
                }
            }
        }
        return valid;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private boolean fail(ConstraintValidatorContext context, String field, String message) {
        context.buildConstraintViolationWithTemplate(message)
                .addPropertyNode(field)
                .addConstraintViolation();
        return false;
    }
}
