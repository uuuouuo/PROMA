package com.ssafy.proma.config.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
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
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.JWT_EXPIRATION_TIME))
                .withClaim("userNo", user.getNo())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        return jwtToken;
    }

    public String createRefresh(){
        String refreshToken = JWT.create()
                .withSubject("jwt토큰")
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.REF_EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        return refreshToken;
    }

    public String getUserNo(String jwtToken) {

        String userNo = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("userNo").asString();
        return userNo;
    }

    public boolean validate(String jwtToken) {
        return validateExpired(jwtToken) && validateForm(jwtToken);
    }

    public boolean validateJwt(String jwtToken) {
        try{
            if(validateExpired(jwtToken)) {
                return false;
            }
            return true;
        } catch (TokenExpiredException e) {
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateExpired(String token){
        Date expiresAt = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token).getExpiresAt();
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
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        return jwtToken;
    }
}
