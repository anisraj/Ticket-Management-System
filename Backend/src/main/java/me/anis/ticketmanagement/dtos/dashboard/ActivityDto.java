package me.anis.ticketmanagement.dtos.dashboard;

import lombok.Data;
import me.anis.ticketmanagement.entities.ActivityAction;

import java.time.LocalDateTime;

@Data
public class ActivityDto {
    private Long id;
    private ActivityAction action;
    private String details;
    private Long ticketId;
    private String ticketTitle;
    private String actor;               // email of the user who did it
    private LocalDateTime createdAt;
}
