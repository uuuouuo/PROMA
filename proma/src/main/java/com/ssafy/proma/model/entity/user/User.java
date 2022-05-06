package com.ssafy.proma.model.entity.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Builder
@ApiModel(value = "User : 회원정보", description = "회원의 상세 정보를 나타낸다.")
public class User {

    @Id
    @Column(name = "USER_NO", nullable = false, length = 15)
    @ApiModelProperty(value = "회원 번호")
    private String no;

    @Column(length = 15)
    @ApiModelProperty(value = "회원 닉네임")
    private String nickname;

    @Column(length = 30)
    @ApiModelProperty(value = "회원 GitHub 노드 ID")
    private String nodeId;

    @Column(length = 300)
    @ApiModelProperty(value = "회원 프로필 이미지 주소")
    private String profileImage;

    @Column
    @ApiModelProperty(value = "회원 삭제 여부")
    private Boolean isDeleted;

    @Column
    @ApiModelProperty(value = "리프레쉬 토큰")
    private String refresh;

    @Builder
    public User(String no, String nickname, String nodeId, String profileImage, Boolean isDeleted, String refresh){
        this.no = no;
        this.nickname = nickname;
        this.nodeId = nodeId;
        this.profileImage = profileImage;
        this.isDeleted = isDeleted;
        this.refresh = refresh;
    }

    public void createUser(String userNo, String userNickname, String userNodeId) {
        this.no = userNo;
        this.nickname = userNickname;
        this.nodeId = userNodeId;
        this.profileImage = null;
        this.isDeleted = false;
        this.refresh = null;
    }

    public void deleteUser(){
        this.isDeleted = true;
    }

    public void setRefresh(String refresh) {
        this.refresh = refresh;
    }

    public User() {
    }
}
