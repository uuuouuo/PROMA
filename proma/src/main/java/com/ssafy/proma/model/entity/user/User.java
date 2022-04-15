package com.ssafy.proma.model.entity.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@ApiModel(value = "User : 회원정보", description = "회원의 상세 정보를 나타낸다.")
public class User {

    @Id
    @Column(name = "USER_NO", nullable = false, length = 15)
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

    protected User(){

    }
}
