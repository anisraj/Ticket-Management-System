package me.anis.ticketmanagement.repositories;

import me.anis.ticketmanagement.entities.Ticket;
import me.anis.ticketmanagement.entities.TicketStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Override
    @EntityGraph(attributePaths = {"createdBy"})
    Page<Ticket> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"createdBy", "watchers"})
    Optional<Ticket> findById(Long id);

    boolean existsByTitleIgnoreCase(String title);

    @Query("select t.status as status, count(t) as total from Ticket t group by t.status")
    List<StatusCount> countTicketsPerStatus();

    long countByDueDateBeforeAndStatusNot(LocalDate date, TicketStatus status);

    interface StatusCount {
        TicketStatus getStatus();
        Long getTotal();
    }
}
