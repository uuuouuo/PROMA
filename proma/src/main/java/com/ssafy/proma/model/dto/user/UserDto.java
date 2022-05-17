package com.ssafy.proma.model.dto.user;

import lombok.Data;

public class UserDto {

    @Data
    public static class LoginRes {

        private String jwtToken;
        private String refToken;
    }

    @Data
    public static class UserRes {

        private String no;
        private String nickname;
        private String profileImage;
    }

    @Data
    public static class UpdateReq {

        private String nickname;
    }
}
