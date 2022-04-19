package com.ssafy.proma.model.Dto.team;

import com.ssafy.proma.model.entity.team.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResTeamDto {

  @Getter
  @NoArgsConstructor
  public static class TeamDto{

    Integer teamNo;
    String name;

    public TeamDto(Integer teamNo, String name) {
      this.teamNo = teamNo;
      this.name = name;
    }

    public TeamDto(Team team){
      this.teamNo = team.getNo();
      this.name = team.getName();
    }

  }

}
