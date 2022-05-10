package com.ssafy.proma.model.dto.sprint;

import com.ssafy.proma.model.dto.team.ResTeamDto.TeamIssueListDto;
import java.util.List;
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
    Integer status;

    public SprintDto(Integer sprintNo, String title, String startDate, String endDate,
        Integer status) {
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

  @Getter
  @NoArgsConstructor
  public static class SprintTeamDto{

    Integer sprintNo;
    String title;
    String startDate;
    String endDate;
    Integer status;
    List<TeamIssueListDto> teams;

    public SprintTeamDto(Integer sprintNo, String title, String startDate, String endDate,
        Integer status,
        List<TeamIssueListDto> teams) {
      this.sprintNo = sprintNo;
      this.title = title;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
      this.teams = teams;
    }

    public SprintTeamDto(
        List<TeamIssueListDto> teams) {
      this.teams = teams;
    }
  }

}
