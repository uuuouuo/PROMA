package com.ssafy.proma.controller;

import com.ssafy.proma.config.auth.jwt.JwtProperties;
import com.ssafy.proma.exception.Message;
import com.ssafy.proma.model.dto.user.UserDto.LoginRes;
import com.ssafy.proma.service.user.UserService;
import com.ssafy.proma.service.user.oauth.GithubAuthService;
import com.ssafy.proma.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final GithubAuthService githubAuthService;
    private final SecurityUtil securityUtil;

    @GetMapping("/login/github")
    @ApiOperation(value = "OAuth 로그인", notes = "로그인 주소이다. 로그인이 성공할 경우 JWT 토큰과 Refresh 토큰을 반환한다.", response = Map.class)
    public ResponseEntity login(@RequestParam("code") String code, HttpServletResponse response) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            resultMap = githubAuthService.login(code);
            LoginRes loginRes = (LoginRes) resultMap.get("loginRes");
            if (loginRes != null && resultMap.get("message").equals(Message.USER_LOGIN_SUCCESS_MESSAGE)) {
                response.addHeader(JwtProperties.JWT_HEADER_STRING, JwtProperties.TOKEN_PREFIX + loginRes.getJwtToken());
                response.addHeader(JwtProperties.REF_HEADER_STRING, JwtProperties.TOKEN_PREFIX + loginRes.getRefToken());
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put("message", Message.USER_LOGIN_ERROR_MESSAGE);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity(resultMap, status);
    }

    @GetMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "로그아웃 주소이다. 그리고 로그아웃이 성공할 경우 http code ok를 반환한다.", response = Map.class)
    public ResponseEntity logout() {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            String userNo = securityUtil.getCurrentUserNo();
            resultMap = githubAuthService.logout(userNo);
            if (resultMap.get("message").equals(Message.USER_LOGOUT_SUCCESS_MESSAGE)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put("message", Message.USER_LOGOUT_ERROR_MESSAGE);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity(resultMap, status);
    }

    @PutMapping("/update")
    @ApiOperation(value = "회원 정보 수정", notes = "회원의 이미지와 닉네임을 수정한다. 수정 성공 시 http code ok를 반환한다.", response = Map.class)
    public ResponseEntity upload(@RequestParam("images") MultipartFile multipartFile, @RequestParam("nickname") String nickname) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            String userNo = securityUtil.getCurrentUserNo();
            resultMap = userService.update(multipartFile, nickname, "image", userNo);
            if (resultMap.get("message").equals(Message.USER_UPDATE_SUCCESS_MESSAGE)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put("message", Message.USER_UPDATE_ERROR_MESSAGE);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @DeleteMapping("/withdrawal/github")
    @ApiOperation(value = "회원 탈퇴", notes = "Proma 탈퇴한다. 탈퇴 성공 시 http code ok를 반환한다.", response = Map.class)
    public ResponseEntity withdrawal(@RequestParam("code") String code) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            String userNo = securityUtil.getCurrentUserNo();
            resultMap = githubAuthService.revoke(code, userNo);
            if (resultMap.get("message").equals(Message.USER_WITHDRAWAL_SUCCESS_MESSAGE)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put("message", Message.USER_WITHDRAWAL_ERROR_MESSAGE);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity(resultMap, status);
    }

    @PostMapping(value = "/refresh")
    @ApiOperation(value = "JWT 토큰 재발급", notes = "JWT 토큰을 재발급한다. 재발급 성공 시 토큰을 반환한다.", response = Map.class)
    public ResponseEntity refresh(@RequestHeader(value = JwtProperties.JWT_HEADER_STRING) String jwtToken,
                                  @RequestHeader(value = JwtProperties.REF_HEADER_STRING) String refToken,
                                  HttpServletResponse response) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        String jwt = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
        String refresh = refToken.replace(JwtProperties.TOKEN_PREFIX, "");
        resultMap = githubAuthService.refreshToken(jwt, refresh);
        String newToken = resultMap.get("newJwtToken").toString();
        System.out.println(newToken);
        if (resultMap.get("message").equals(Message.USER_REFRESH_SUCCESS_MESSAGE)) {
            status = HttpStatus.OK;
        }
        response.addHeader(JwtProperties.JWT_HEADER_STRING, JwtProperties.TOKEN_PREFIX + newToken);

        return new ResponseEntity(resultMap, status);
    }

    @GetMapping("/data")
    @ApiOperation(value = "회원정보 확인", notes = "회원정보를 확인한다. 유효한 요청일 경우 회원정보를 반환한다.", response = Map.class)
    public ResponseEntity findUser() {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        try {
            String userNo = securityUtil.getCurrentUserNo();
            resultMap = userService.getByUserNo(userNo);
            if (resultMap.get("message").equals(Message.USER_FIND_SUCCESS_MESSAGE)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            resultMap.put("message", Message.USER_FIND_ERROR_MESSAGE);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity(resultMap, status);
    }

}
