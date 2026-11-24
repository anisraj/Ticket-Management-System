package me.anis.ticketmanagement.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import me.anis.ticketmanagement.dtos.ticket.CreateTicketRequest;
import me.anis.ticketmanagement.dtos.ticket.TicketDto;
import me.anis.ticketmanagement.services.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tickets")
public class TicketController {
    private final TicketService ticketService;

    @GetMapping
    public List<TicketDto> getAllTickets() {
        return ticketService.getAll();
    }

    @GetMapping("/{id}")
    public TicketDto getTicket(@PathVariable Long id) {
        return ticketService.getById(id);
    }

    @GetMapping("/title-exists")
    public boolean titleExists(@RequestParam(name = "title") String title) {
        return ticketService.titleExists(title);
    }

    @PostMapping
    public ResponseEntity<TicketDto> createTicket(
            @Valid @RequestBody CreateTicketRequest request,
            @AuthenticationPrincipal Long userId,
            UriComponentsBuilder uriComponentsBuilder) {
        var ticketDto = ticketService.create(request, userId);
        var uri = uriComponentsBuilder.path("/tickets/{id}").buildAndExpand(ticketDto.getId()).toUri();
        return ResponseEntity.created(uri).body(ticketDto);
    }
}
