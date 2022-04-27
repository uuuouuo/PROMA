package com.ssafy.proma.service.user.oauth;

import com.fasterxml.jackson.annotation.OptBoolean;
import com.ssafy.proma.config.auth.jwt.JwtTokenService;
import com.ssafy.proma.config.auth.provider.ClientGithub;
import com.ssafy.proma.model.dto.UserDto;
import com.ssafy.proma.model.dto.UserDto.LoginRes;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;

@Service
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
        System.out.println(jwtToken);

        LoginRes loginRes = new LoginRes();
        loginRes.setJwtToken(jwtToken);

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

    public String updateToken(String userNo) {
        Optional<User> userOptional = userRepository.findByNo(userNo);

        String newJwtToken = null;

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            newJwtToken = jwtTokenService.create(user);
        }

        return newJwtToken;
    }

    public String logout(String userNo) {

        Optional<User> userOptional = userRepository.findByNo(userNo);

        String newJwtToken = null;

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            newJwtToken = jwtTokenService.logout(user);
        }
        return newJwtToken;

    }
}
