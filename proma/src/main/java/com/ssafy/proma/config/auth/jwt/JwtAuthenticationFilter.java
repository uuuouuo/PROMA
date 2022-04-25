package com.ssafy.proma.config.auth.jwt;

import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.ssafy.proma.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

            final String authorizationHeader = request.getHeader("JWT");


            if(authorizationHeader == null) {
                request.setAttribute("exception", ErrorCode.NON_LOGIN.getCode());
                filterChain.doFilter(request,response);
            }

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String jwtToken = authorizationHeader.replace("Bearer ", "");

                try{
                    if (jwtTokenService.validate(jwtToken)) {
                        Authentication authentication = jwtTokenService.getAuthentication(jwtToken);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        filterChain.doFilter(request, response);
                    }
                } catch(TokenExpiredException e) {
                    e.printStackTrace();
                    request.setAttribute("exception", ErrorCode.EXPIRED_TOKEN.getCode());
                    filterChain.doFilter(request, response);
                } catch(SignatureVerificationException e) {
                    e.printStackTrace();
                    request.setAttribute("exception", ErrorCode.INVALID_TOKEN.getCode());
                    filterChain.doFilter(request, response);
                }

            }

    }
}
