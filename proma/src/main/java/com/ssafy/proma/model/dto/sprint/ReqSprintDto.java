package com.ssafy.proma.model.dto.sprint;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReqSprintDto{

  @Getter
  @NoArgsConstructor
  public static class SprintCreateDto{

    String name;
    String startDate;
    String endDate;
    String projectNo;

    public SprintCreateDto(String name, String startDate, String endDate, String projectNo) {
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.projectNo = projectNo;
    }

    public Sprint toEntity(Project project){

      Timestamp startDateTime = Timestamp.valueOf(startDate);
      Timestamp endDateTime = Timestamp.valueOf(endDate);

      return Sprint.builder().name(name).startDate(startDateTime).endDate(endDateTime).status(false).project(project).build();
    }
  }

}
