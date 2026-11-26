package me.anis.ticketmanagement.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import me.anis.ticketmanagement.dtos.PageResponse;
import me.anis.ticketmanagement.dtos.ticket.CreateTicketRequest;
import me.anis.ticketmanagement.dtos.ticket.TicketDto;
import me.anis.ticketmanagement.dtos.ticket.TicketListItemDto;
import me.anis.ticketmanagement.entities.ActivityAction;
import me.anis.ticketmanagement.entities.TicketActivity;
import me.anis.ticketmanagement.entities.TicketStatus;
import me.anis.ticketmanagement.exceptions.DuplicateTicketTitleException;
import me.anis.ticketmanagement.exceptions.InvalidQueryException;
import me.anis.ticketmanagement.exceptions.TicketNotFoundException;
import me.anis.ticketmanagement.mappers.TicketMapper;
import me.anis.ticketmanagement.repositories.TicketActivityRepository;
import me.anis.ticketmanagement.repositories.TicketRepository;
import me.anis.ticketmanagement.repositories.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
@AllArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketMapper ticketMapper;
    private final TicketActivityRepository activityRepository;

    private static final int MAX_PAGE_SIZE = 50;
    private static final Set<String> SORT_FIELDS = Set.of("title", "createdAt");

    private static final int MAX_SEARCH_LENGTH = 100;

    public PageResponse<TicketListItemDto> getPage(int page, int size, String sort, String q) {
        if (page < 1) {
            throw new InvalidQueryException("page", "Page must be 1 or more");
        }
        if (size < 1 || size > MAX_PAGE_SIZE) {
            throw new InvalidQueryException("size", "Size must be between 1 and " + MAX_PAGE_SIZE);
        }
        var search = q == null ? "" : q.trim();
        if (search.length() > MAX_SEARCH_LENGTH) {
            throw new InvalidQueryException("q", "Search text must be at most " + MAX_SEARCH_LENGTH + " characters");
        }
        var sortSpec = parseSort(sort);

        var pageable = PageRequest.of(page - 1, size, sortSpec.toSort());
        var result = search.isEmpty()
                ? ticketRepository.findAll(pageable)
                : ticketRepository.search(toLikePattern(search), pageable);
        return PageResponse.from(result.map(ticketMapper::toListItem), sortSpec.asText());
    }

    // % and _ are wildcards in LIKE. We escape them with ! so the text is searched as plain text.
    private String toLikePattern(String text) {
        var escaped = text.toLowerCase(Locale.ROOT)
                .replace("!", "!!")
                .replace("%", "!%")
                .replace("_", "!_");
        return "%" + escaped + "%";
    }

    private SortSpec parseSort(String sort) {
        var parts = sort.split(",");
        var field = parts[0].trim();
        var direction = parts.length > 1 ? parts[1].trim().toLowerCase() : "asc";

        if (parts.length > 2 || !SORT_FIELDS.contains(field)) {
            throw new InvalidQueryException("sort", "Sort field must be title or createdAt");
        }
        if (!direction.equals("asc") && !direction.equals("desc")) {
            throw new InvalidQueryException("sort", "Sort direction must be asc or desc");
        }
        return new SortSpec(field, Sort.Direction.fromString(direction));
    }

    private record SortSpec(String field, Sort.Direction direction) {
        Sort toSort() {
            // "id" as the second sort keeps the order stable between pages
            return Sort.by(new Sort.Order(direction, field)).and(Sort.by(Sort.Direction.ASC, "id"));
        }

        String asText() {
            return field + "," + direction.name().toLowerCase();
        }
    }

    public TicketDto getById(Long id) {
        var ticket = ticketRepository.findById(id).orElseThrow(TicketNotFoundException::new);
        return ticketMapper.toDto(ticket);
    }

    public boolean titleExists(String title) {
        return ticketRepository.existsByTitleIgnoreCase(title.trim());
    }

    @Transactional
    public TicketDto create(CreateTicketRequest request, Long userId) {
        if (titleExists(request.getTitle())) {
            throw new DuplicateTicketTitleException();
        }
        var user = userRepository.findById(userId).orElseThrow();

        var ticket = ticketMapper.toEntity(request);
        ticket.setStatus(TicketStatus.Open);
        ticket.setCreatedBy(user);

        try {
            ticketRepository.saveAndFlush(ticket);
        } catch (DataIntegrityViolationException ex) {
            throw new DuplicateTicketTitleException();
        }

        activityRepository.save(TicketActivity.builder()
                .ticket(ticket)
                .actor(user)
                .action(ActivityAction.CREATED)
                .build());

        return ticketMapper.toDto(ticket);
    }
}
