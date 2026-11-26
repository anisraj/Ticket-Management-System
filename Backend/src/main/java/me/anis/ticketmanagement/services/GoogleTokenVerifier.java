package me.anis.ticketmanagement.services;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import lombok.extern.slf4j.Slf4j;
import me.anis.ticketmanagement.config.GoogleConfig;
import me.anis.ticketmanagement.exceptions.GoogleUnavailableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@Slf4j
@Service
public class GoogleTokenVerifier {
    private final GoogleConfig config;
    private final JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
    private final GoogleIdTokenVerifier verifier;

    public GoogleTokenVerifier(GoogleConfig config) {
        this.config = config;
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(List.of(config.isConfigured() ? config.getClientId() : "not-configured"))
                .build();
    }

    public GoogleIdToken.Payload verify(String idTokenText) {
        if (!config.isConfigured()) {
            throw new GoogleUnavailableException();
        }

        GoogleIdToken idToken;
        try {
            idToken = GoogleIdToken.parse(jsonFactory, idTokenText);
        } catch (IOException | IllegalArgumentException e) {
            throw new BadCredentialsException("Invalid Google token");        // not a token at all
        }

        try {
            // signature, issuer, expiry and audience (our Client ID)
            if (idToken == null || !verifier.verify(idToken)) {
                throw new BadCredentialsException("Invalid Google token");
            }
        } catch (GeneralSecurityException e) {
            throw new BadCredentialsException("Invalid Google token");
        } catch (IOException e) {
            log.warn("Could not reach Google to check the token", e);
            throw new GoogleUnavailableException();                            // not the user's fault
        }

        var payload = idToken.getPayload();
        if (payload.getEmail() == null || !Boolean.TRUE.equals(payload.getEmailVerified())) {
            throw new BadCredentialsException("Google email is not verified");
        }

        var domain = config.getAllowedDomain();
        if (domain != null && !domain.isBlank() && !domain.equalsIgnoreCase(payload.getHostedDomain())) {
            throw new BadCredentialsException("Google account is not from the allowed domain");
        }
        return payload;
    }
}
