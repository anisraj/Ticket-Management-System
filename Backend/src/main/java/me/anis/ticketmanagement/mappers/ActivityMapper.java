package me.anis.ticketmanagement.mappers;

import me.anis.ticketmanagement.dtos.dashboard.ActivityDto;
import me.anis.ticketmanagement.entities.TicketActivity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ActivityMapper {
    @Mapping(target = "ticketId", source = "ticket.id")
    @Mapping(target = "ticketTitle", source = "ticket.title")
    @Mapping(target = "actor", source = "actor.email")
    ActivityDto toDto(TicketActivity activity);
}
