package com.ssafy.proma.config;

import com.ssafy.proma.config.auth.jwt.JwtAuthenticationFilter;
import com.ssafy.proma.config.auth.jwt.JwtAuthorizationFilter;
import com.ssafy.proma.config.auth.jwt.JwtTokenService;
import com.ssafy.proma.exception.CustomAuthenticationEntryPoint;
import com.ssafy.proma.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final UserRepository userRepository;
    private final JwtTokenService jwtTokenService;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(corsFilter)
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenService),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilter(new JwtAuthorizationFilter(authenticationManager(),
                        userRepository, jwtTokenService))
                .authorizeRequests()
                .antMatchers("/**")
                .permitAll()
                .and()
                .oauth2Login()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint());
//                .defaultSuccessUrl("/")
//                .userInfoEndpoint()
//                .userService(principalOauth2UserService);
    }
}
