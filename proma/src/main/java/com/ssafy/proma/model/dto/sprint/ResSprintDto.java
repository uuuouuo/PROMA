package com.ssafy.proma.model.dto.sprint;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResSprintDto {

  @Getter
  @NoArgsConstructor
  public static class SprintDto{

    Integer sprintNo;
    String title;
    String startDate;
    String endDate;
    Boolean status;

    public SprintDto(Integer sprintNo, String title, String startDate, String endDate,
        Boolean status) {
      this.sprintNo = sprintNo;
      this.title = title;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
    }
  }

  @Getter
  @NoArgsConstructor
  public static class SprintNoTitle{

    Integer sprintNo;
    String title;

    public SprintNoTitle(Integer sprintNo, String title) {
      this.sprintNo = sprintNo;
      this.title = title;
    }
  }
}
