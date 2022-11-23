package pl.com.seremak.simplebills.commons.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import pl.com.seremak.simplebills.commons.dto.http.TokenUser;

import java.util.Map;
import java.util.Objects;

import static pl.com.seremak.simplebills.commons.utils.ObjectMapperUtils.objectMapper;


public class JwtExtractionHelper {

    public static final String EXTRACTING_TOKEN_ERROR_MSG = "Error while extracting token. Reason: %s";
    public static final String TOKEN_NOT_MATCH = "Token not match";


    public static String extractUsername(final JwtAuthenticationToken jwtAuthenticationToken) {
        return extractUser(jwtAuthenticationToken).getPreferredUsername();
    }

    public static TokenUser extractUser(final JwtAuthenticationToken jwtAuthenticationToken) {
        try {
            final Map<String, Object> claims = jwtAuthenticationToken.getToken().getClaims();
            return objectMapper().convertValue(claims, new TypeReference<>() {
            });
        } catch (final Exception e) {
            final String errorMsg = EXTRACTING_TOKEN_ERROR_MSG.formatted(e.getMessage());
            throw new AuthenticationServiceException(errorMsg);
        }
    }

    public static void validateUsername(final String tokenUsername, final String bodyUsername) {
        if (Objects.nonNull(tokenUsername) && tokenUsername.equals(bodyUsername)) {
            final String errorMsg = EXTRACTING_TOKEN_ERROR_MSG.formatted(TOKEN_NOT_MATCH);
            throw new AuthenticationServiceException(errorMsg);
        }
    }
}
