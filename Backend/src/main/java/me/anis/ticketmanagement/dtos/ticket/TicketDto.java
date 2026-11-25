package me.anis.ticketmanagement.dtos.ticket;

import lombok.Data;
import me.anis.ticketmanagement.entities.TicketPriority;
import me.anis.ticketmanagement.entities.TicketStatus;
import me.anis.ticketmanagement.entities.TicketType;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class TicketDto {
    private Long id;
    private String title;
    private TicketStatus status;
    private String description;
    private TicketType type;
    private TicketPriority priority;
    private LocalDate dueDate;
    private LocalDate escalationDate;
    private String stepsToReproduce;
    private String managerEmail;
    private String justification;
    private Set<String> watchers;
    private String createdBy;          // creator's email
    private LocalDateTime createdAt;
    private Long assigneeId;
}
