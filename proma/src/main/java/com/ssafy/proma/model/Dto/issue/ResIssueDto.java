package com.ssafy.proma.model.Dto.issue;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResIssueDto {

  @Getter
  @NoArgsConstructor
  public static class TopicIssueDto{

    Integer issueNo;
    String title;

    public TopicIssueDto(Integer issueNo, String title) {
      this.issueNo = issueNo;
      this.title = title;
    }
  }

}
