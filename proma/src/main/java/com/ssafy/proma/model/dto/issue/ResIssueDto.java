package com.ssafy.proma.model.dto.issue;

import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamIssueDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResIssueDto {

  @Getter
  @NoArgsConstructor
  public static class IssueNoTitleDto{

    Integer issueNo;
    UserDto assignee;
    String title;
    String status;

    public IssueNoTitleDto(Integer issueNo, UserDto assignee, String title, String status) {
      this.issueNo = issueNo;
      this.assignee = assignee;
      this.title = title;
      this.status = status;
    }
  }

  @Getter
  @NoArgsConstructor
  public static class IssueDetailsDto{

    Integer issueNo;
    TeamIssueDto team;
    String issueTitle;
    String description;
    String status;
    TopicDto topic;
    UserDto assignee;
    Integer sprintNo;

    public IssueDetailsDto(Integer issueNo, TeamIssueDto team, String issueTitle,
        String description, String status,
        TopicDto topic, UserDto assignee, Integer sprintNo) {
      this.issueNo = issueNo;
      this.team = team;
      this.issueTitle = issueTitle;
      this.description = description;
      this.status = status;
      this.topic = topic;
      this.assignee = assignee;
      this.sprintNo = sprintNo;
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
