package me.anis.ticketmanagement.dtos.ticket;

import lombok.Data;
import me.anis.ticketmanagement.entities.TicketPriority;
import me.anis.ticketmanagement.entities.TicketStatus;
import me.anis.ticketmanagement.entities.TicketType;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class TicketListItemDto {
    private Long id;
    private String title;
    private TicketStatus status;
    private TicketType type;
    private TicketPriority priority;
    private LocalDate dueDate;
    private String createdBy;          // creator's email
    private LocalDateTime createdAt;
}
