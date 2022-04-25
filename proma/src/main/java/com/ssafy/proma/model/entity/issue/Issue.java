package com.ssafy.proma.model.entity.issue;

import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.model.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@ApiModel(value = "ISSUE : 이슈정보", description = "이슈의 상세 정보를 나타낸다.")
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ISSUE_NO", nullable = false)
    @ApiModelProperty(value = "이슈 번호")
    private Integer no;

    @Column(length = 15)
    @ApiModelProperty(value = "이슈 제목")
    private String title;

    @Column(length = 100)
    @ApiModelProperty(value = "이슈 설명")
    private String description;

    @Column(length = 10)
    @ApiModelProperty(value = "이슈 상태")
    private String status;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "ASSIGNEE", nullable = false)
    @ApiModelProperty(value = "이슈를 담당하는 유저")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "TEAM_NO", nullable = false)
    @ApiModelProperty(value = "이슈를 포함하고 있는 팀")
    private Team team;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "TOPIC_NO", nullable = false)
    @ApiModelProperty(value = "이슈를 포함하고 있는 토픽")
    private Topic topic;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "SPRINT_NO", nullable = false)
    @ApiModelProperty(value = "이슈를 포함하고 있는 스프린트")
    private Sprint sprint;


}

