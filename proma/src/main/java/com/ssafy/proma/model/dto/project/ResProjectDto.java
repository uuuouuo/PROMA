package com.ssafy.proma.model.dto.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResProjectDto {

  @Getter
  @NoArgsConstructor
  public static class ProjectNoTitleDto{

    String projectNo;
    String title;
    String role;

    public ProjectNoTitleDto(String projectNo, String title, String role) {
      this.projectNo = projectNo;
      this.title = title;
      this.role = role;
    }
  }

  @Getter
  @AllArgsConstructor
  public static class ProjectDetailDto{
    String title;
  }

}
