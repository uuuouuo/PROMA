package com.ssafy.proma.controller;

import com.ssafy.proma.config.auth.jwt.JwtProperties;
import com.ssafy.proma.config.auth.jwt.JwtTokenService;
import com.ssafy.proma.model.dto.user.UserDto.LoginRes;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.service.user.UserService;
import com.ssafy.proma.service.user.oauth.GithubAuthService;
import com.ssafy.proma.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final GithubAuthService githubAuthService;
    private final JwtTokenService jwtTokenService;
    private final SecurityUtil securityUtil;

    @GetMapping("/login/github")
    @ApiOperation(value = "OAuth 로그인", notes = "로그인 주소이다. 로그인이 성공할 경우 JWT 토큰과 Refresh 토큰을 반환한다.", response = Map.class)
    public ResponseEntity<LoginRes> login(@RequestParam("code") String code, HttpServletResponse response){
        System.out.println(code);
        LoginRes loginRes = githubAuthService.login(code);
        response.addHeader(JwtProperties.JWT_HEADER_STRING, JwtProperties.TOKEN_PREFIX + loginRes.getJwtToken());
        response.addHeader(JwtProperties.REF_HEADER_STRING, JwtProperties.TOKEN_PREFIX + loginRes.getRefToken());

        return new ResponseEntity<LoginRes>(loginRes, HttpStatus.OK);
    }

    @GetMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "로그아웃 주소이다. 그리고 로그아웃이 성공할 경우 http code ok를 반환한다.", response = Map.class)
    public ResponseEntity logout(){
        String userNo = securityUtil.getCurrentUserNo();
        githubAuthService.logout(userNo);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/withdrawal/github")
    @ApiOperation(value = "회원 탈퇴", notes = "Proma 탈퇴한다. 탈퇴 성공 시 http code ok를 반환한다.", response = Map.class)
    public ResponseEntity withdrawal(@RequestParam("code") String code){
        // github revoke
        githubAuthService.revoke(code);
        // db isDelete true 변경
        String userNo = securityUtil.getCurrentUserNo();
        userService.deleteUser(userNo);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/refresh")
    @ApiOperation(value = "JWT 토큰 재발급", notes = "JWT 토큰을 재발급한다. 재발급 성공 시 토큰을 반환한다.", response = Map.class)
    public ResponseEntity<String> refresh(@RequestHeader(value = JwtProperties.JWT_HEADER_STRING) String jwtToken,
                                          @RequestHeader(value = JwtProperties.REF_HEADER_STRING) String refToken,
                                          @RequestBody String userNo, HttpServletResponse response) {
        String jwt = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
        String refresh = refToken.replace(JwtProperties.TOKEN_PREFIX, "");
        String newToken = githubAuthService.refreshToken(userNo, jwt, refresh);
        response.addHeader(JwtProperties.JWT_HEADER_STRING, JwtProperties.TOKEN_PREFIX + newToken);
        return new ResponseEntity<String>(newToken, HttpStatus.OK);
    }

    @GetMapping("/token")
    @ApiOperation(value = "(사용X)토큰 테스트용 API", notes = "프론트 사용하는 API 아님.", response = Map.class)
    public ResponseEntity<String> tokenCheck(@RequestHeader HttpHeaders headers){
        String jwtToken = headers.getFirst(JwtProperties.JWT_HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
        if(jwtTokenService.validate(jwtToken)){
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/data")
    @ApiOperation(value = "회원정보 확인", notes = "회원정보를 확인한다. 유효한 요청일 경우 회원정보를 반환한다.", response = Map.class)
    public ResponseEntity<User> findUser(){
        String userNo = securityUtil.getCurrentUserNo();
        System.out.println(userNo);
        User findUser = userService.getByUserNo(userNo);
        return new ResponseEntity<User>(findUser, HttpStatus.OK);
    }

}
