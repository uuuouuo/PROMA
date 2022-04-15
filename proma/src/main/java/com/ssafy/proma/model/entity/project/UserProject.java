package com.ssafy.proma.model.entity.project;

import com.ssafy.proma.model.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
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

    protected UserProject(){

    }

}