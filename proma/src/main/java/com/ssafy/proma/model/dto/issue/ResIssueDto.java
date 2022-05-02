package com.ssafy.proma.model.dto.issue;

import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
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
    String issueTitle;
    String description;
    String status;
    TopicDto topic;
    UserDto assignee;

    public IssueDetailsDto(Integer issueNo, String issueTitle, String description,
        String status, Integer topicNo, String topicTitle, String userNo, String nickname) {
      this.issueNo = issueNo;
      this.issueTitle = issueTitle;
      this.description = description;
      this.status = status;
      this.topic = new TopicDto(topicNo,topicTitle);
      this.assignee = new UserDto(userNo,nickname);
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

          public UserDto(String userNo, String nickname) {
            this.userNo = userNo;
            this.nickname = nickname;
      }
    }

  }


}
