package me.anis.ticketmanagement.services;

import lombok.AllArgsConstructor;
import me.anis.ticketmanagement.dtos.ticket.CreateTicketRequest;
import me.anis.ticketmanagement.dtos.ticket.TicketDto;
import me.anis.ticketmanagement.entities.TicketStatus;
import me.anis.ticketmanagement.exceptions.DuplicateTicketTitleException;
import me.anis.ticketmanagement.exceptions.TicketNotFoundException;
import me.anis.ticketmanagement.mappers.TicketMapper;
import me.anis.ticketmanagement.repositories.TicketRepository;
import me.anis.ticketmanagement.repositories.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketMapper ticketMapper;

    public List<TicketDto> getAll() {
        return ticketRepository.findAll(Sort.by("id"))
                .stream()
                .map(ticketMapper::toDto)
                .toList();
    }

    public TicketDto getById(Long id) {
        var ticket = ticketRepository.findById(id).orElseThrow(TicketNotFoundException::new);
        return ticketMapper.toDto(ticket);
    }

    public boolean titleExists(String title) {
        return ticketRepository.existsByTitleIgnoreCase(title.trim());
    }

    public TicketDto create(CreateTicketRequest request, Long userId) {
        if (titleExists(request.getTitle())) {
            throw new DuplicateTicketTitleException();
        }
        var user = userRepository.findById(userId).orElseThrow();

        var ticket = ticketMapper.toEntity(request);
        ticket.setStatus(TicketStatus.Open);   // never taken from the request
        ticket.setCreatedBy(user);             // always the logged-in user

        try {
            ticketRepository.saveAndFlush(ticket);
        } catch (DataIntegrityViolationException ex) {
            // two requests with the same title at the same moment: the unique index stops the second one
            throw new DuplicateTicketTitleException();
        }
        return ticketMapper.toDto(ticket);
    }
}
