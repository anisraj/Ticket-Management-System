package me.anis.ticketmanagement.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import me.anis.ticketmanagement.dtos.UserProfileDto;
import me.anis.ticketmanagement.dtos.user.CreateUserRequest;
import me.anis.ticketmanagement.dtos.user.UserDto;
import me.anis.ticketmanagement.repositories.UserRepository;
import me.anis.ticketmanagement.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping("/{id}")
    public UserProfileDto getProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(u -> new UserProfileDto(u.getId(), u.getName(), u.getEmail(), u.getRole()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @PostMapping
    public ResponseEntity<UserDto> create(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(request));
    }
}
