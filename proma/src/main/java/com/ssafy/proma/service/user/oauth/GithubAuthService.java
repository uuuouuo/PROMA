package com.ssafy.proma.service.user.oauth;

import com.ssafy.proma.config.auth.jwt.JwtTokenService;
import com.ssafy.proma.config.auth.provider.ClientGithub;
import com.ssafy.proma.exception.Message;
import com.ssafy.proma.model.dto.user.UserDto.LoginRes;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.service.AbstractService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GithubAuthService extends AbstractService {

    private final ClientGithub clientGithub;
    private final JwtTokenService jwtTokenService;
    private final UserRepository userRepository;

    @Transactional
    public Map<String, Object> login(String code) {
        Map<String, Object> resultMap = new HashMap<>();

        User user = clientGithub.getUserData(code);

        String userNo = user.getNo();

        Optional<User> findUserByNodeID = userRepository.findByNoAndIsDeleted(userNo, false);

        if (findUserByNodeID.isEmpty()) {
            userRepository.save(user);
        }

        String jwtToken = jwtTokenService.create(user);
        String refToken = jwtTokenService.createRefresh();
        Optional<User> userOp = userRepository.findByNo(userNo);
        User findUser = takeOp(userOp);
        findUser.setRefresh(refToken);

        LoginRes loginRes = new LoginRes();
        loginRes.setJwtToken(jwtToken);
        loginRes.setRefToken(refToken);

        resultMap.put("loginRes", loginRes);
        resultMap.put("message", Message.USER_LOGIN_SUCCESS_MESSAGE);

        return resultMap;
    }

    @Transactional
    public Map<String, Object> revoke(String code, String userNo) throws IOException {
        Map<String, Object> resultMap = new HashMap<>();
        clientGithub.deleteUserData(code);
        Optional<User> userOp = userRepository.findByNo(userNo);
        User findUser = takeOp(userOp);
        findUser.deleteUser();
        resultMap.put("message", Message.USER_WITHDRAWAL_SUCCESS_MESSAGE);
        return resultMap;
    }

    public Map<String, Object> refreshToken(String jwtToken, String refToken) {
        Map<String, Object> resultMap = new HashMap<>();
//        if (!jwtTokenService.validateJwt(jwtToken))
//            throw new IllegalStateException("Token 만료되지 않음");
        Optional<User> findUserOptional = userRepository.findByRefresh(refToken);
        if (findUserOptional.isEmpty())
            throw new IllegalStateException("Refresh Token 유효하지 않음");

        User findUser = findUserOptional.get();
        String newJwtToken = jwtTokenService.create(findUser);
        resultMap.put("newJwtToken", newJwtToken);
        resultMap.put("message", Message.USER_REFRESH_SUCCESS_MESSAGE);
        System.out.println(newJwtToken);

        return resultMap;
    }

    @Transactional
    public Map<String, Object> logout(String userNo) {

        Map<String, Object> resultMap = new HashMap<>();
        Optional<User> userOp = userRepository.findByNo(userNo);
        User findUser = takeOp(userOp);
        findUser.setRefresh("invalidate");
        resultMap.put("message", Message.USER_LOGOUT_SUCCESS_MESSAGE);

        return resultMap;

    }
}
