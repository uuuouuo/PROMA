package com.ssafy.proma.model.dto;

import lombok.Data;

public class UserDto {

    @Data
    public static class LoginRes {

        private String jwtToken;
    }
}
