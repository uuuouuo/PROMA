package com.ssafy.proma.config.auth.provider;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ClientGithub implements ClientProxy {

    private final UserService userService;
    private static String API_KEY = "e9aef6fccada43586c11";
    private static String SECRET_KEY = "9ad91b0d27056363f971845f3bee0dc46f93d472";

    public User getUserData(String code) {

        MultiValueMap<String, String> req = new LinkedMultiValueMap<>();
        req.add("client_id", API_KEY);
        req.add("client_secret", SECRET_KEY);
        req.add("code", code);

        String res = WebClient.builder().baseUrl("https://github.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .build().post()
                .uri("/login/oauth/access_token")
                .body(BodyInserters.fromFormData(req))
                .retrieve()
                .bodyToMono(String.class)
                .block();
        String subStr = res.substring(13); // access_token= 자르기
        String[] spiltStr = subStr.split("&");
        String accessToken = spiltStr[0];
        System.out.println(accessToken);
        Map<String, Object> userResponse = WebClient.builder()
                .build().get()
                .uri("https://api.github.com/user")
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToFlux(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .blockFirst();

        User user = new User();
//        for (Map.Entry<String, Object> entry : userResponse.entrySet()) {
//            if (entry.getValue() != null) {
//                System.out.println(entry.getKey() + " : " + entry.getValue().toString());
//            } else {
//                System.out.println(entry.getKey() + " : null");
//            }
//        }

        String userNodeId = userResponse.get("node_id").toString();
        Optional<User> findUserByNodeId = userService.checkUserNodeId(userNodeId);

        String userNo = null;
        if (findUserByNodeId.isPresent()){
            userNo = findUserByNodeId.get().getNo();
        } else {
            userNo = RandomStringUtils.randomAlphanumeric(15);
            Optional<User> findUserByUserNO = userService.checkUserNo(userNo);
            while (findUserByUserNO.isPresent()) {
                userNo = RandomStringUtils.randomAlphanumeric(15);
                findUserByUserNO = userService.checkUserNo(userNo);
            }
        }

        user.createUser(userNo, userResponse.get("login").toString(), userResponse.get("node_id").toString());

        return user;

    }

    public boolean deleteUserData(String code) throws IOException {

        MultiValueMap<String, String> req = new LinkedMultiValueMap<>();
        req.add("client_id", API_KEY);
        req.add("client_secret", SECRET_KEY);
        req.add("code", code);

        String res = WebClient.builder().baseUrl("https://github.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .build().post()
                .uri("/login/oauth/access_token")
                .body(BodyInserters.fromFormData(req))
                .retrieve()
                .bodyToMono(String.class)
                .block();
        String subStr = res.substring(13); // access_token= 자르기
        String[] spiltStr = subStr.split("&");
        String accessToken = spiltStr[0];
        System.out.println(accessToken);

        HashMap<String, String> params = new HashMap<>();
        params.put("access_token", accessToken);

        ObjectMapper mapper = new ObjectMapper();

        byte[] paramBytes = mapper.writeValueAsString(params).getBytes(StandardCharsets.UTF_8);

        URL url = new URL("https://api.github.com/applications/" + API_KEY + "/grant");

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("DELETE");
        connection.addRequestProperty("Authorization", "Basic " + Base64.getEncoder().encodeToString((API_KEY + ":" + SECRET_KEY).getBytes()));
        connection.addRequestProperty("Accept", "application/vnd.github.v3+json");
        connection.addRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        connection.setDoOutput(true);
        connection.getOutputStream().write(paramBytes);

        int status = connection.getResponseCode();

        connection.disconnect();

        return status == 204;
    }
}
