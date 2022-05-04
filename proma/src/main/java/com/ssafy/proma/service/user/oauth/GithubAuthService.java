package com.ssafy.proma.service.user.oauth;

import com.ssafy.proma.config.auth.jwt.JwtTokenService;
import com.ssafy.proma.config.auth.provider.ClientGithub;
import com.ssafy.proma.model.dto.user.UserDto.LoginRes;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GithubAuthService {

    private final ClientGithub clientGithub;
    private final JwtTokenService jwtTokenService;
    private final UserRepository userRepository;

    @Transactional
    public LoginRes login(String code) {
        User user = clientGithub.getUserData(code);

        String userNo = user.getNo();
        System.out.println(userNo + " " + user.getNickname());

        Optional<User> findUserByNodeID = userRepository.findByNoAndIsDeleted(userNo, false);

        if (findUserByNodeID.isEmpty()) {
            userRepository.save(user);
        }

        String jwtToken = jwtTokenService.create(user);
        String refToken = jwtTokenService.createRefresh();
        System.out.println(jwtToken);
        User findUser = userRepository.findByNo(userNo).get();
        findUser.setRefresh(refToken);

        LoginRes loginRes = new LoginRes();
        loginRes.setJwtToken(jwtToken);
        loginRes.setRefToken(refToken);

        return  loginRes;
    }

    public boolean revoke(String code) {
        try {
            clientGithub.deleteUserData(code);
        } catch (IOException e){
            return false;
        }
        return true;
    }

    public String refreshToken(String jwtToken, String refToken){
        if(!jwtTokenService.validateJwt(jwtToken))
            throw new AccessDeniedException("Token 만료되지 않음");
        Optional<User> findUserOptional = userRepository.findByRefresh(refToken);
        if(findUserOptional.isEmpty() || !jwtTokenService.validateExpired(refToken))
            throw new AccessDeniedException("Refresh Token 유효하지 않음");

        User findUser = findUserOptional.get();
        String newJwtToken = jwtTokenService.create(findUser);

        return newJwtToken;
    }

    public String updateToken(String userNo) {
        Optional<User> userOptional = userRepository.findByNo(userNo);

        String newJwtToken = null;

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            newJwtToken = jwtTokenService.create(user);
        }

        return newJwtToken;
    }

    public boolean logout(String userNo) {

        Optional<User> userOptional = userRepository.findByNo(userNo);

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRefresh("invalidate");
            return true;
        }
        return false;

    }
}
