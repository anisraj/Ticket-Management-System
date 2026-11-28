package me.anis.ticketmanagement.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import me.anis.ticketmanagement.entities.Gender;
import me.anis.ticketmanagement.entities.Role;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private Integer age;
    private Gender gender;
    private String mobile;
    private Boolean isActive;
}