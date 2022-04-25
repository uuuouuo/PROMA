package com.ssafy.proma.config.auth.jwt;

import com.ssafy.proma.config.auth.security.PrincipalDetails;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;
    private JwtTokenService jwtTokenService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, JwtTokenService jwtTokenService) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
        String jwtHeader = request.getHeader("JWT");

        if(jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request,response);
            return;
        }

        String jwtToken = request.getHeader("JWT").replace("Bearer ","");
        String userNo = jwtTokenService.getUserNo(jwtToken);

        if(userNo != null) {
            Optional<User> userEntity = userRepository.findByNo(userNo);

            PrincipalDetails principalDetails = new PrincipalDetails(userEntity.get());

            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,null, principalDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request,response);

        }

    }
}

