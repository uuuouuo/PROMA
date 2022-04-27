package com.ssafy.proma.service.user;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    public Optional<User> checkUserNo(String userNo){
        Optional<User> findUser = userRepository.findByNoAndIsDeleted(userNo, false);
        return findUser;
    }

    public Optional<User> checkUserNodeId(String userNodeId){
        Optional<User> findUser = userRepository.findByNodeIdAndIsDeleted(userNodeId, false);
        return findUser;
    }

    public boolean deleteUser(HttpHeaders headers){
        User user = tokenToUser(headers);
        User findUser = userRepository.findByNo(user.getNo()).get();
        findUser.deleteUser();
        return true;
    }

    public User tokenToUser(HttpHeaders headers) {
        String jwtToken = headers.getFirst("JWT");
        String changeJwtToken = jwtToken.replace("Bearer ", "");
        String userNo = JWT.require(Algorithm.HMAC512("proma")).build().verify(changeJwtToken).getClaim("userNo").asString();
        Optional<User> findUser = userRepository.findByNo(userNo);
        if(findUser.isPresent()){
            return findUser.get();
        }
        return null;
    }
}
