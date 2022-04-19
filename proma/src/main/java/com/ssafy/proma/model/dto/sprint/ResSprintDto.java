package com.ssafy.proma.model.dto.sprint;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResSprintDto {

  @Getter
  @NoArgsConstructor
  public static class SprintDto{

    Integer sprintNo;
    String name;
    String startDate;
    String endDate;
    Boolean status;

    public SprintDto(Integer sprintNo, String name, String startDate, String endDate,
        Boolean status) {
      this.sprintNo = sprintNo;
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
    }
  }

}
