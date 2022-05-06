package com.ssafy.proma.config.auth.jwt;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.ssafy.proma.config.auth.security.PrincipalDetails;
import com.ssafy.proma.exception.ErrorCode;
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

        String path = request.getServletPath();

        if (path.equals("/user/refresh")) {
            String refToken = request.getHeader(JwtProperties.REF_HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
            try {
            jwtTokenService.validateExpired(refToken);
            } catch (TokenExpiredException e) {
                e.printStackTrace();
                request.setAttribute("exception", ErrorCode.EXPIRED_REF_TOKEN.getCode());
                chain.doFilter(request, response);
                return;
            }
            Optional<User> userEntity = userRepository.findByRefresh(refToken);
            if (userEntity.isEmpty())
                throw new IllegalStateException("Refresh Token 유효하지 않음");
            PrincipalDetails principalDetails = new PrincipalDetails(userEntity.get());
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
            return;
        }

        String jwtHeader = request.getHeader(JwtProperties.JWT_HEADER_STRING);

        if (jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String jwtToken = request.getHeader(JwtProperties.JWT_HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
        String userNo = jwtTokenService.getUserNo(jwtToken);

        if (userNo != null) {
            Optional<User> userEntity = userRepository.findByNo(userNo);

            PrincipalDetails principalDetails = new PrincipalDetails(userEntity.get());

            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);

        }
    }

}

