package me.anis.ticketmanagement.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import me.anis.ticketmanagement.config.JwtConfig;
import me.anis.ticketmanagement.dtos.JwtResponse;
import me.anis.ticketmanagement.dtos.auth.LoginRequest;
import me.anis.ticketmanagement.entities.User;
import me.anis.ticketmanagement.repositories.UserRepository;
import me.anis.ticketmanagement.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final JwtConfig jwtConfig;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletResponse response) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        response.addCookie(buildRefreshCookie(refreshToken, jwtConfig.getRefreshTokenExpiration()));

        return ResponseEntity.ok(toResponse(accessToken, user));
    }

    private JwtResponse toResponse(String accessToken, User user) {
        return new JwtResponse(accessToken, new JwtResponse.UserInfo(user.getEmail(), user.getRole()));
    }

    private Cookie buildRefreshCookie(String value, int maxAgeSeconds) {
        var cookie = new Cookie("refreshToken", value);
        cookie.setHttpOnly(true);
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge(maxAgeSeconds);
        cookie.setSecure(jwtConfig.isCookieSecure());
        return cookie;
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refresh(
            @CookieValue(value = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null || !jwtService.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        var user = userRepository.findById(jwtService.getUserIdFromToken(refreshToken)).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(toResponse(jwtService.generateAccessToken(user), user));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        response.addCookie(buildRefreshCookie("", 0));   // Max-Age 0 tells the browser to delete it
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Void> handleBadCredentials() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
