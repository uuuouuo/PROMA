package com.ssafy.proma.model.entity.team;

import com.ssafy.proma.model.entity.project.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import lombok.NoArgsConstructor;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@Builder
@AllArgsConstructor
@ApiModel(value = "Team : 팀정보", description = "팀의 상세 정보를 나타낸다.")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TEAM_NO", nullable = false)
    @ApiModelProperty(value = "팀 번호")
    private Integer no;

    @Column(length = 15)
    @ApiModelProperty(value = "팀 제목")
    private String name;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PROJECT_NO", nullable = false)
    @ApiModelProperty(value = "팀을 포함하고 있는 프로젝트")
    private Project project;

    protected Team(){

    }

}

