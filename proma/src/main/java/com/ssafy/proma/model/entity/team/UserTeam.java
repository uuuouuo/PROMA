package com.ssafy.proma.model.entity.team;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@Builder
@AllArgsConstructor
@ApiModel(value = "UserTeam : 유저와 팀", description = "유저와 팀의 연관관계를 나타낸다.")
public class UserTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_TEAM_NO", nullable = false)
    @ApiModelProperty(value = "유저와 팀 연관관계 번호")
    private Integer no;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_NO", nullable = false)
    @ApiModelProperty(value = "유저 정보")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "TEAM_NO", nullable = false)
    @ApiModelProperty(value = "팀 정보")
    private Team team;

    protected UserTeam(){

    }

}
