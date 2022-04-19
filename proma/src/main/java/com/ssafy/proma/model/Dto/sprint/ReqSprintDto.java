package com.ssafy.proma.model.Dto.sprint;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReqSprintDto {

  @Getter
  @NoArgsConstructor
  public static class SprintCreateDto{

    String name;
    String startDate;
    String endDate;

    public SprintCreateDto(String name, String startDate, String endDate) {
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
    }

//    public Sprint toEntity(Project project){
//      Timestamp startDateTime = DateTime.Parse(String)
//      return Sprint.builder().name(name).startDate(startDate).endDate(endDate).status(false).build();
//    }
  }

}
