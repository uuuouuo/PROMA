package com.ssafy.proma.model.dto.team;

import com.ssafy.proma.model.entity.team.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResTeamDto {

  @Getter
  @NoArgsConstructor
  public static class TeamDto{

    Integer teamNo;
    String title;
    Boolean isMember;

    public TeamDto(Integer teamNo, String title, Boolean isMember) {
      this.teamNo = teamNo;
      this.title = title;
      this.isMember = isMember;
    }

    public TeamDto(Team team){
      this.teamNo = team.getNo();
      this.title = team.getName();
    }

  }

  @Getter
  @AllArgsConstructor
  public static class TeamMemberDto {

    String userNo;
    String nickName;
    String profileImage;

  }

}
