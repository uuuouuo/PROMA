package com.ssafy.proma.config;

import com.ssafy.proma.config.auth.jwt.JwtProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*");
        config.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList(JwtProperties.JWT_HEADER_STRING, "Cache-Control", "Content-Type", JwtProperties.REF_HEADER_STRING));
        config.setAllowCredentials(true);
        config.addExposedHeader(JwtProperties.JWT_HEADER_STRING);
        config.addExposedHeader(JwtProperties.REF_HEADER_STRING);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}