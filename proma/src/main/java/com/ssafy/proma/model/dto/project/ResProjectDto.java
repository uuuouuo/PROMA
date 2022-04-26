package com.ssafy.proma.model.dto.project;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResProjectDto {

  @Getter
  @NoArgsConstructor
  public static class ProjectNoTitleDto{

    Integer projectNo;
    String title;

    public ProjectNoTitleDto(Integer projectNo, String title) {
      this.projectNo = projectNo;
      this.title = title;
    }
  }

}
