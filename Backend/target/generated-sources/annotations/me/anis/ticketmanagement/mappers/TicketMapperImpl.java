package me.anis.ticketmanagement.mappers;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import me.anis.ticketmanagement.dtos.ticket.CreateTicketRequest;
import me.anis.ticketmanagement.dtos.ticket.TicketDto;
import me.anis.ticketmanagement.entities.Ticket;
import me.anis.ticketmanagement.entities.User;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-11-24T16:51:46+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class TicketMapperImpl implements TicketMapper {

    @Override
    public TicketDto toDto(Ticket ticket) {
        if ( ticket == null ) {
            return null;
        }

        TicketDto ticketDto = new TicketDto();

        ticketDto.setCreatedBy( ticketCreatedByEmail( ticket ) );
        ticketDto.setId( ticket.getId() );
        ticketDto.setTitle( ticket.getTitle() );
        ticketDto.setStatus( ticket.getStatus() );
        ticketDto.setDescription( ticket.getDescription() );
        ticketDto.setType( ticket.getType() );
        ticketDto.setPriority( ticket.getPriority() );
        ticketDto.setDueDate( ticket.getDueDate() );
        ticketDto.setEscalationDate( ticket.getEscalationDate() );
        ticketDto.setStepsToReproduce( ticket.getStepsToReproduce() );
        ticketDto.setManagerEmail( ticket.getManagerEmail() );
        ticketDto.setJustification( ticket.getJustification() );
        Set<String> set = ticket.getWatchers();
        if ( set != null ) {
            ticketDto.setWatchers( new LinkedHashSet<String>( set ) );
        }
        ticketDto.setCreatedAt( ticket.getCreatedAt() );

        return ticketDto;
    }

    @Override
    public Ticket toEntity(CreateTicketRequest request) {
        if ( request == null ) {
            return null;
        }

        Ticket.TicketBuilder ticket = Ticket.builder();

        ticket.title( trim( request.getTitle() ) );
        ticket.description( trim( request.getDescription() ) );
        ticket.stepsToReproduce( blankToNull( request.getStepsToReproduce() ) );
        ticket.managerEmail( blankToNull( request.getManagerEmail() ) );
        ticket.justification( blankToNull( request.getJustification() ) );
        ticket.type( request.getType() );
        ticket.priority( request.getPriority() );
        ticket.dueDate( request.getDueDate() );
        ticket.escalationDate( request.getEscalationDate() );
        List<String> list = request.getWatchers();
        if ( list != null ) {
            ticket.watchers( new LinkedHashSet<String>( list ) );
        }

        return ticket.build();
    }

    private String ticketCreatedByEmail(Ticket ticket) {
        User createdBy = ticket.getCreatedBy();
        if ( createdBy == null ) {
            return null;
        }
        return createdBy.getEmail();
    }
}
