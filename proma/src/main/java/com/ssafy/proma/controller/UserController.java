package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.user.UserDto.LoginRes;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.service.user.UserService;
import com.ssafy.proma.service.user.oauth.GithubAuthService;
import com.ssafy.proma.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
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
    private final SecurityUtil securityUtil;

    @GetMapping("/login/github")
    @ApiOperation(value = "OAuth 로그인", notes = "GitHub에서 Redirect하는 주소이다. 그리고 로그인이 성공할 경우 JWT 토큰을 반환한다.", response = Map.class)
    public ResponseEntity<LoginRes> login(@RequestParam("code") String code, HttpServletResponse response){
        System.out.println(code);
        LoginRes loginRes = githubAuthService.login(code);
        response.addHeader("JWT", "Bearer " + loginRes.getJwtToken());

        return new ResponseEntity<LoginRes>(loginRes, HttpStatus.OK);
    }

    @DeleteMapping("/withdrawal/github")
    @ApiOperation(value = "회원 탈퇴", notes = "Proma 탈퇴를 하는 주소이다. 탈퇴 성공 시 SUCCESS를 반환한다.", response = Map.class)
    public ResponseEntity<String> withdrawal(@RequestParam("code") String code){
        // github revoke
        githubAuthService.revoke(code);
        // db isDelete true 변경
        String userNo = securityUtil.getCurrentUserNo();
        userService.deleteUser(userNo);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }


    @GetMapping()
    @ApiOperation(value = "(사용X)회원정보 테스트용 API", notes = "Header에 담긴 토큰을 자동으로 체크해 유저정보를 알려준다.", response = Map.class)
    public ResponseEntity<User> findUser(){
        String userNo = securityUtil.getCurrentUserNo();
        System.out.println(userNo);
        User findUser = userService.getByUserNo(userNo);
        return new ResponseEntity<User>(findUser, HttpStatus.OK);
    }


}
