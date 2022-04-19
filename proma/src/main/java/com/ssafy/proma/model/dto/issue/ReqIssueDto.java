package com.ssafy.proma.model.dto.issue;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReqIssueDto {

  @Getter
  @NoArgsConstructor
  public static class IssueCreateDto{

    String title;
    String description;

  }

}
