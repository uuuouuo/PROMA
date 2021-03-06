package com.ssafy.proma.model.entity.project;

import static javax.persistence.FetchType.LAZY;

import com.ssafy.proma.model.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
@Builder
@AllArgsConstructor
@ApiModel(value = "UserProject : 유저와 프로젝트", description = "유저와 프로젝트의 연관관계를 나타낸다.")
public class UserProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_TEAM_NO", nullable = false)
    @ApiModelProperty(value = "유저와 프로젝트 연관관계 번호")
    private Integer no;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_NO", nullable = false)
    @ApiModelProperty(value = "유저 정보")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PROJECT_NO", nullable = false)
    @ApiModelProperty(value = "프로젝트 정보")
    private Project project;

    @Column(length = 10)
    @ApiModelProperty(value = "유저 권한")
    private String role;

    protected UserProject(){

    }

}