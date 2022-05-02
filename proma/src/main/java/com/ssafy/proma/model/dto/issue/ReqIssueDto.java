package com.ssafy.proma.model.dto.issue;

import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.model.entity.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReqIssueDto {

  @Getter
  @NoArgsConstructor
  public static class IssueCreateDto {

    String title;
    String description;
    Integer sprintNo;
    Integer teamNo;
    Integer topicNo;
    String status;

    public Issue toEntity(Sprint sprint, Team team, Topic topic, User user) {
      return Issue.builder().title(title).description(description).sprint(sprint).team(team)
          .topic(topic).user(user).status(status).build();
    }
  }
  @Getter
  @NoArgsConstructor
  public static class IssueUpdateDto {

    String title;
    String description;
    Integer topicNo;
    String userNo;
  }

  @Getter
  @NoArgsConstructor
  public static class IssueSprintDto {

    Integer issueNo;
    Integer sprintNo;

  }
  @Getter
  @NoArgsConstructor
  public static class IssueStatusDto {

    Integer issueNo;
    String status;

  }

}
