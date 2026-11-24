package me.anis.ticketmanagement.mappers;

import me.anis.ticketmanagement.dtos.ticket.CreateTicketRequest;
import me.anis.ticketmanagement.dtos.ticket.TicketDto;
import me.anis.ticketmanagement.entities.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface TicketMapper {
    @Mapping(target = "createdBy", source = "createdBy.email")
    TicketDto toDto(Ticket ticket);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "title", qualifiedByName = "trim")
    @Mapping(target = "description", qualifiedByName = "trim")
    @Mapping(target = "stepsToReproduce", qualifiedByName = "blankToNull")
    @Mapping(target = "managerEmail", qualifiedByName = "blankToNull")
    @Mapping(target = "justification", qualifiedByName = "blankToNull")
    Ticket toEntity(CreateTicketRequest request);

    @Named("trim")
    default String trim(String value) {
        return value == null ? null : value.trim();
    }

    @Named("blankToNull")
    default String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
