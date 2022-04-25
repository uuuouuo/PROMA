package com.ssafy.proma.model.entity.user;

import com.ssafy.proma.config.auth.provider.ClientGithub;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@ApiModel(value = "User : 회원정보", description = "회원의 상세 정보를 나타낸다.")
public class User {

    @Id
    @Column(name = "USER_NO", nullable = false, length = 30)
    @ApiModelProperty(value = "회원 번호")
    private String no;

    @Column(length = 15)
    @ApiModelProperty(value = "회원 닉네임")
    private String nickname;

    @Column(length = 300)
    @ApiModelProperty(value = "회원 프로필 이미지 주소")
    private String profileImage;

    @Column
    @ApiModelProperty(value = "회원 삭제 여부")
    private boolean isDeleted;

    @Builder
    public User(String no, String nickname, String profileImage, boolean isDeleted){
        this.no = no;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.isDeleted = isDeleted;
    }

    public void createUser(ClientGithub.UserResponse userResponse) {
        this.no = userResponse.getGithub_account().get("node_id").toString();
        this.nickname = userResponse.getGithub_account().get("login").toString();
        this.profileImage = null;
        this.isDeleted = false;
    }

    public User() {
    }
}
