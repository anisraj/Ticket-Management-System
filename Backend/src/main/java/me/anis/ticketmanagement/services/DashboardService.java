package me.anis.ticketmanagement.services;

import lombok.AllArgsConstructor;
import me.anis.ticketmanagement.dtos.dashboard.ActivityDto;
import me.anis.ticketmanagement.dtos.dashboard.DashboardSummaryDto;
import me.anis.ticketmanagement.entities.TicketStatus;
import me.anis.ticketmanagement.exceptions.InvalidQueryException;
import me.anis.ticketmanagement.mappers.ActivityMapper;
import me.anis.ticketmanagement.repositories.TicketActivityRepository;
import me.anis.ticketmanagement.repositories.TicketRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.EnumMap;
import java.util.List;

@Service
@AllArgsConstructor
public class DashboardService {
    private static final int MAX_ACTIVITY = 50;

    private final TicketRepository ticketRepository;
    private final TicketActivityRepository activityRepository;
    private final ActivityMapper activityMapper;

    public DashboardSummaryDto getSummary() {
        var counts = new EnumMap<TicketStatus, Long>(TicketStatus.class);
        ticketRepository.countTicketsPerStatus()
                .forEach(row -> counts.put(row.getStatus(), row.getTotal()));

        long open = counts.getOrDefault(TicketStatus.Open, 0L);
        long inProgress = counts.getOrDefault(TicketStatus.InProgress, 0L);
        long closed = counts.getOrDefault(TicketStatus.Closed, 0L);
        long blocked = counts.getOrDefault(TicketStatus.Blocked, 0L);
        long overdue = ticketRepository.countByDueDateBeforeAndStatusNot(
                LocalDate.now(), TicketStatus.Closed);

        return new DashboardSummaryDto(open + inProgress + closed + blocked,
                open, inProgress, closed, blocked, overdue);
    }

    public List<ActivityDto> getRecentActivity(int limit) {
        if (limit < 1 || limit > MAX_ACTIVITY) {
            throw new InvalidQueryException("limit", "Limit must be between 1 and " + MAX_ACTIVITY);
        }
        // newest first; "id" as the second sort keeps the order stable
        var sort = Sort.by(Sort.Direction.DESC, "createdAt").and(Sort.by(Sort.Direction.DESC, "id"));
        return activityRepository.findAll(PageRequest.of(0, limit, sort))
                .getContent()
                .stream()
                .map(activityMapper::toDto)
                .toList();
    }
}
