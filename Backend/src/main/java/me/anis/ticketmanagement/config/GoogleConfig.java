package me.anis.ticketmanagement.config;

import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
@ConfigurationProperties(prefix = "spring.google")
@Data
public class GoogleConfig {
    private String clientId;
    private String allowedDomain;

    public boolean isConfigured() {
        return clientId != null && clientId.endsWith(".apps.googleusercontent.com");
    }

    @PostConstruct
    void warnIfNotConfigured() {
        if (!isConfigured()) {
            log.warn("GOOGLE_CLIENT_ID is not set. POST /auth/google will answer 503.");
        }
    }
}
