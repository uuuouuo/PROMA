package com.ssafy.proma.config.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.proma.config.auth.security.PrincipalDetails;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtTokenService {

    private final UserRepository userRepository;

    public String create(User user){
        String jwtToken = JWT.create()
                .withSubject("jwt토큰")
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
//                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60))
                .withClaim("userNo", user.getNo())
                .sign(Algorithm.HMAC512("proma"));
        return jwtToken;
    }

    public String getUserNo(String jwtToken) {

        String userNo = JWT.require(Algorithm.HMAC512("proma")).build().verify(jwtToken).getClaim("userNo").asString();
        return userNo;
    }

    public boolean validate(String jwtToken) {
        return validateForm(jwtToken) && validateExpired(jwtToken);
    }

    public boolean validateExpired(String jwtToken){
        Date expiresAt = JWT.require(Algorithm.HMAC512("proma")).build().verify(jwtToken).getExpiresAt();
        Date cur = new Date();

        if(expiresAt.compareTo(cur) < 0) {
            return false;
        }
        return true;
    }

    public boolean validateForm(String jwtToken){
        String userNo = getUserNo(jwtToken);
        Optional<User> userOptional = userRepository.findByNo(userNo);

        if(userOptional.isEmpty()) {
            return false;
        }
        return true;

    }

    public Authentication getAuthentication(String jwtToken) {

        if(validate(jwtToken)) {

            String userNo = getUserNo(jwtToken);
            Optional<User> userOptional = userRepository.findByNo(userNo);

            User user = null;

            if(userOptional.isPresent()) {
                user = userOptional.get();
            }

            PrincipalDetails principalDetails = new PrincipalDetails(user);
            return new UsernamePasswordAuthenticationToken(principalDetails, jwtToken);
        }
        return null;
    }

    public String update(String jwtToken) {

        String userNo = getUserNo(jwtToken);
        Optional<User> userOptional = userRepository.findByNo(userNo);

        if(userOptional.isPresent()) {
            return create(userOptional.get());
        }
        return null;
    }

    public String logout(User user) {

        String jwtToken = JWT.create()
                .withSubject("jwt토큰")
                .withExpiresAt(new Date(System.currentTimeMillis() - System.currentTimeMillis()))
                .withClaim("userNo", user.getNo())
                .sign(Algorithm.HMAC512("proma"));
        return jwtToken;
    }
}
