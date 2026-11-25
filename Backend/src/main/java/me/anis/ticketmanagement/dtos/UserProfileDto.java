package me.anis.ticketmanagement.dtos;

import me.anis.ticketmanagement.entities.Role;

public record UserProfileDto(Long id, String name, String email, Role role) {}
