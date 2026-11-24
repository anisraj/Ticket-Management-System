package me.anis.ticketmanagement.repositories;

import me.anis.ticketmanagement.entities.Ticket;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Override
    @EntityGraph(attributePaths = {"createdBy", "watchers"})
    List<Ticket> findAll(Sort sort);

    @Override
    @EntityGraph(attributePaths = {"createdBy", "watchers"})
    Optional<Ticket> findById(Long id);

    boolean existsByTitleIgnoreCase(String title);
}
