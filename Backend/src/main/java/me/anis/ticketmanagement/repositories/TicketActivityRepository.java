package me.anis.ticketmanagement.repositories;

import me.anis.ticketmanagement.entities.TicketActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketActivityRepository extends JpaRepository<TicketActivity, Long> {
    @Override
    @EntityGraph(attributePaths = {"ticket", "actor"})
    Page<TicketActivity> findAll(Pageable pageable);
}
