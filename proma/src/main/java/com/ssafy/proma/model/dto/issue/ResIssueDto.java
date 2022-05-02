package com.ssafy.proma.model.dto.issue;

import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResIssueDto {

  @Getter
  @NoArgsConstructor
  public static class IssueNoTitleDto{

    Integer issueNo;
    UserDto assignee;
    String title;

    public IssueNoTitleDto(Integer issueNo, UserDto assignee, String title) {
      this.issueNo = issueNo;
      this.assignee = assignee;
      this.title = title;
    }
  }

  @Getter
  @NoArgsConstructor
  public static class IssueDetailsDto{

    Integer issueNo;
    TeamDto team;
    String issueTitle;
    String description;
    String status;
    TopicDto topic;
    UserDto assignee;

    public IssueDetailsDto(Integer issueNo, TeamDto team, String issueTitle, String description,
        String status, TopicDto topic, UserDto assignee) {
      this.issueNo = issueNo;
      this.team = team;
      this.issueTitle = issueTitle;
      this.description = description;
      this.status = status;
      this.topic = topic;
      this.assignee = assignee;
    }

    @Getter
    public static class TopicDto{
      Integer topicNo;
      String topicTitle;

      public TopicDto(Integer topicNo, String topicTitle) {
        this.topicNo = topicNo;
        this.topicTitle = topicTitle;
      }
    }

    @Getter
        public static class UserDto{
          String userNo;
          String nickname;
          String image;

          public UserDto(String userNo, String nickname, String image) {
            this.userNo = userNo;
            this.nickname = nickname;
            this.image = image;
      }
    }

  }


}
