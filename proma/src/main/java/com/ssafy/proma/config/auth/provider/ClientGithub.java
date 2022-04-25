package com.ssafy.proma.config.auth.provider;

import com.ssafy.proma.model.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Component
public class ClientGithub implements ClientProxy{

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Res{
        String access_token;
        String scope;
        String token_type;
    }

    public User getUserData(String code) {

        MultiValueMap<String,String> req = new LinkedMultiValueMap<>();
//        req.add("grant_type","authorization_code");
        req.add("client_id","e9aef6fccada43586c11");
        req.add("client_secret","9ad91b0d27056363f971845f3bee0dc46f93d472");
//        req.add("redirect_uri","http://localhost:8080/login/github/callback");
        req.add("code",code);

        Res res = WebClient.builder().baseUrl("github.com").defaultHeader(HttpHeaders.CONTENT_TYPE,
                        MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .build().post()
                .uri("/login/oauth/access_token")
                .body(BodyInserters.fromFormData(req))
                .retrieve()
                .bodyToMono(Res.class)
                .block();

        String accessToken = res.getAccess_token();
        System.out.println(accessToken);
        UserResponse userResponse = WebClient.builder().build().get()
                .uri("https://api.github.com/user")
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(UserResponse.class)
                .block();

        User user = new User();
        for(Map.Entry<String,Object> entry : userResponse.getGithub_account().entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue().toString());
        }
        user.createUser(userResponse);

        return user;

    }

    @Data
    public static class UserResponse {

        Map<String, Object> github_account;

    }
}
