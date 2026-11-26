package me.anis.ticketmanagement.mappers;

import javax.annotation.processing.Generated;
import me.anis.ticketmanagement.dtos.dashboard.ActivityDto;
import me.anis.ticketmanagement.entities.Ticket;
import me.anis.ticketmanagement.entities.TicketActivity;
import me.anis.ticketmanagement.entities.User;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-11-26T15:45:37+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class ActivityMapperImpl implements ActivityMapper {

    @Override
    public ActivityDto toDto(TicketActivity activity) {
        if ( activity == null ) {
            return null;
        }

        ActivityDto activityDto = new ActivityDto();

        activityDto.setTicketId( activityTicketId( activity ) );
        activityDto.setTicketTitle( activityTicketTitle( activity ) );
        activityDto.setActor( activityActorEmail( activity ) );
        activityDto.setId( activity.getId() );
        activityDto.setAction( activity.getAction() );
        activityDto.setDetails( activity.getDetails() );
        activityDto.setCreatedAt( activity.getCreatedAt() );

        return activityDto;
    }

    private Long activityTicketId(TicketActivity ticketActivity) {
        Ticket ticket = ticketActivity.getTicket();
        if ( ticket == null ) {
            return null;
        }
        return ticket.getId();
    }

    private String activityTicketTitle(TicketActivity ticketActivity) {
        Ticket ticket = ticketActivity.getTicket();
        if ( ticket == null ) {
            return null;
        }
        return ticket.getTitle();
    }

    private String activityActorEmail(TicketActivity ticketActivity) {
        User actor = ticketActivity.getActor();
        if ( actor == null ) {
            return null;
        }
        return actor.getEmail();
    }
}
