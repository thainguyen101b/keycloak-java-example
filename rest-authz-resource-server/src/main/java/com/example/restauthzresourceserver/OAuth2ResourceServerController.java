package com.example.restauthzresourceserver;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OAuth2ResourceServerController {

    @GetMapping
    public String index(@AuthenticationPrincipal Jwt jwt) {
        return String.format("Hello %s!", jwt.getClaimAsString("preferred_username"));
    }

    @GetMapping("/protected/premium")
    public String protectedPremium(@AuthenticationPrincipal Jwt jwt) {
        return String.format("Hello, %s!", jwt.getClaimAsString("preferred_username"));
    }

}
