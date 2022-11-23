package pl.com.seremak.simplebills.commons.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriUtils;

import java.net.URI;

public class EndpointUtils {

    public static ResponseEntity<String> prepareCreatedResponse(final String uriPattern, final String identifier) {
        return prepareCreatedResponse(uriPattern, identifier, identifier);
    }

    public static <T> ResponseEntity<T> prepareCreatedResponse(final String uriPattern, final String identifier, final T body) {
        final String uriStr = String.format(uriPattern, UriUtils.encode(identifier, "UTF-8"));
        final URI uri = URI.create(uriStr);
        return ResponseEntity.created(uri)
                .body(body);
    }

    public static String decodeUriParam(final String uriParam) {
        return UriUtils.decode(uriParam, "UTF-8");
    }
}
