package me.anis.ticketmanagement.controllers;

import lombok.AllArgsConstructor;
import me.anis.ticketmanagement.dtos.UserProfileDto;
import me.anis.ticketmanagement.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public UserProfileDto getProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(u -> new UserProfileDto(u.getId(), u.getName(), u.getEmail(), u.getRole()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
