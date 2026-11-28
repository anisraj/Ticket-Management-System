    package me.anis.ticketmanagement.services;

    import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
    import jakarta.transaction.Transactional;
    import lombok.AllArgsConstructor;
    import me.anis.ticketmanagement.dtos.user.CreateUserRequest;
    import me.anis.ticketmanagement.dtos.user.UserDto;
    import me.anis.ticketmanagement.entities.Role;
    import me.anis.ticketmanagement.entities.User;
    import me.anis.ticketmanagement.exceptions.DuplicateEmailException;
    import me.anis.ticketmanagement.repositories.UserRepository;
    import org.springframework.dao.DataIntegrityViolationException;
    import org.springframework.security.authentication.BadCredentialsException;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Service;

    import java.util.Collections;
    import java.util.Locale;

    @AllArgsConstructor
    @Service
    public class UserService implements UserDetailsService {
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;

        @Override
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
            var user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException(email + " not found"));
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword() == null ? "" : user.getPassword(),   // Google users have no password
                    Collections.emptyList()
            );
        }

        @Transactional
        public User findOrCreateGoogleUser(GoogleIdToken.Payload payload) {
            var sub = payload.getSubject();
            var email = payload.getEmail().toLowerCase(Locale.ROOT);
            var picture = pictureOf(payload);

            var bySub = userRepository.findByGoogleSub(sub);
            if (bySub.isPresent()) {
                var user = bySub.get();
                user.setPictureUrl(picture);                   // saved when the transaction ends
                return user;
            }

            var byEmail = userRepository.findByEmail(email);
            if (byEmail.isPresent()) {
                var existing = byEmail.get();
                if (existing.getGoogleSub() != null && !existing.getGoogleSub().equals(sub)) {
                    throw new BadCredentialsException("This email is linked to another Google account");
                }
                existing.setGoogleSub(sub);
                existing.setPictureUrl(picture);
                return userRepository.save(existing);
            }

            var name = payload.get("name") instanceof String text && !text.isBlank()
                    ? text
                    : email.substring(0, email.indexOf('@'));
            return userRepository.save(User.builder()
                    .name(name)
                    .email(email)
                    .googleSub(sub)
                    .pictureUrl(picture)
                    .role(Role.USER)
                    .build());
        }

        private String pictureOf(GoogleIdToken.Payload payload) {
            return payload.get("picture") instanceof String url
                    && url.startsWith("https://")
                    && url.length() <= 500
                    ? url
                    : null;
        }

        public UserDto create(CreateUserRequest request) {
            var email = request.getEmail().trim().toLowerCase();

            if (userRepository.existsByEmail(email)) {
                throw new DuplicateEmailException();
            }

            var user = User.builder()
                    .name(request.getName().trim())
                    .email(email)
                    .password(passwordEncoder.encode(request.getPassword()))
                    .age(request.getAge())
                    .gender(request.getGender())
                    .mobile(request.getMobile())
                    .active(request.getIsActive())
                    .role(request.getRole())
                    .build();

            try {
                return toDto(userRepository.saveAndFlush(user));
            } catch (DataIntegrityViolationException e) {
                // same email saved twice at the same moment: the unique constraint caught it
                throw new DuplicateEmailException();
            }
        }

        private UserDto toDto(User user) {
            return new UserDto(
                    user.getId(), user.getName(), user.getEmail(), user.getRole(),
                    user.getAge(), user.getGender(), user.getMobile(), user.isActive());
        }
    }
