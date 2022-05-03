package com.ssafy.proma.model.dto.user;

import lombok.Data;

public class UserDto {

    @Data
    public static class LoginRes {

        private String jwtToken;
        private String refToken;
    }
}
