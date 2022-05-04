package com.ssafy.proma.model.entity.issue;

import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.model.entity.user.User;
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
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(length = 15)
    @ApiModelProperty(value = "진행 상태")
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
    @JoinColumn(name = "SPRINT_NO")
    @ApiModelProperty(value = "이슈를 포함하고 있는 스프린트")
    private Sprint sprint;

    public void update(String title, String description,
        User user, Topic topic) {
        this.title = title;
        this.description = description;
        this.user = user;
        this.topic = topic;
    }

    public void assignSprint(Sprint sprint){
        this.sprint = sprint;
    }

    public void deassignSprint() {
        this.sprint = null;
    }

    public void changeStatus(String status){
        this.status = status;
    }
}

