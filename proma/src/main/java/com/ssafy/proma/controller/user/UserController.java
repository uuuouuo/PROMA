package com.ssafy.proma.controller.user;

import com.ssafy.proma.model.dto.UserDto;
import com.ssafy.proma.model.dto.UserDto.LoginRes;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.service.user.UserService;
import com.ssafy.proma.service.user.oauth.GithubAuthService;
import lombok.RequiredArgsConstructor;
import org.kohsuke.github.GHUser;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final GithubAuthService githubAuthService;

    @GetMapping("/login/github/callback")
    public ResponseEntity<String> login(@RequestParam("code") String code, HttpServletResponse response){
        System.out.println(code);
        LoginRes loginRes = githubAuthService.login(code);

        response.addHeader("JWT", "Bearer " + loginRes.getJwtToken());
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }


}
