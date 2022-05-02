package com.ssafy.proma.model.dto.team;

import com.ssafy.proma.model.entity.team.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResTeamDto {

  @Getter
  @NoArgsConstructor
  public static class TeamDto{

    Integer teamNo;
    String title;

    public TeamDto(Integer teamNo, String title) {
      this.teamNo = teamNo;
      this.title = title;
    }

    public TeamDto(Team team){
      this.teamNo = team.getNo();
      this.title = team.getName();
    }

  }

}
