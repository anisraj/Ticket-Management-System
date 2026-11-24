package me.anis.ticketmanagement.dtos.ticket;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import me.anis.ticketmanagement.entities.TicketPriority;
import me.anis.ticketmanagement.entities.TicketType;
import me.anis.ticketmanagement.validation.ValidTicketRules;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@ValidTicketRules
public class CreateTicketRequest {
    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 80, message = "Title must be between 5 and 80 characters")
    private String title;

    @NotNull(message = "Type is required")
    private TicketType type;

    @NotNull(message = "Priority is required")
    private TicketPriority priority;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 500, message = "Description must be between 10 and 500 characters")
    private String description;

    private LocalDate dueDate;
    private LocalDate escalationDate;

    @Size(max = 1000, message = "Steps must be less than 1000 characters")
    private String stepsToReproduce;

    @Size(max = 255, message = "Manager email is too long")
    private String managerEmail;

    @Size(max = 1000, message = "Justification must be less than 1000 characters")
    private String justification;

    @Size(max = 5, message = "At most 5 watchers are allowed")
    private List<@NotBlank(message = "Watcher email is required")
        @Email(message = "Watcher email must be valid") String> watchers = new ArrayList<>();
}
