package com.ssafy.proma.model.dto.sprint;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

      DateTimeFormatter DATEFORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

      LocalDate startDateTime = LocalDate.parse(startDate, DATEFORMATTER);
      LocalDate endDateTime = LocalDate.parse(endDate, DATEFORMATTER);

      return Sprint.builder().name(name).startDate(startDateTime).endDate(endDateTime).status(false).project(project).build();
    }

    @Getter
    @NoArgsConstructor
    public static class SprintUpdateDto{

      String name;
      String startDate;
      String endDate;

      public SprintUpdateDto(String name, String startDate, String endDate) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
      }
    }

  }

}
