package me.anis.ticketmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import me.anis.ticketmanagement.entities.Role;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String accessToken;
    private UserInfo user;

    @Data
    @AllArgsConstructor
    public static class UserInfo {
        private String email;
        private Role role;
    }
}
