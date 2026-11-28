package me.anis.ticketmanagement.dtos.user;

import jakarta.validation.constraints.*;
import lombok.Data;
import me.anis.ticketmanagement.entities.Gender;
import me.anis.ticketmanagement.entities.Role;

@Data
public class CreateUserRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be 2 to 100 characters")
    private String name;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age must be at most 100")
    private Integer age;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotNull(message = "Is active is required")
    private Boolean isActive;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit mobile number")
    private String mobile;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 255, message = "Email is too long")
    private String email;

    @NotBlank
    @Size(min = 6, max = 25, message = "Password must be between 6 to 25 characters")
    private String password;

    @NotNull(message = "Role is required")
    private Role role;
}