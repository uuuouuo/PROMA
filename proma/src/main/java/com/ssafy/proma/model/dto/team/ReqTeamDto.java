package com.ssafy.proma.model.dto.team;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.team.UserTeam;
import com.ssafy.proma.model.entity.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReqTeamDto {

  @Getter
  @NoArgsConstructor
  public static class TeamCreateDto{
    String title;
    String projectNo;


    public Team toEntity(Project project) {
      return Team.builder().name(title).project(project).build();
    }

    public UserTeam toEntity(Team team, User user) {
      return UserTeam.builder().team(team).user(user).build();
    }

  }

  @Getter
  @NoArgsConstructor
  public static class TeamJoinDto{

    Integer teamNo;
    String userNo;

    public TeamJoinDto(Integer teamNo, String userNo) {
      this.teamNo = teamNo;
      this.userNo = userNo;
    }
    public UserTeam toEntity(Team team, User user) {
      return UserTeam.builder().team(team).user(user).build();
    }
  }


  @Getter
  @NoArgsConstructor
  public static class TeamUpdateDto {

    Integer teamNo;
    String title;

    public TeamUpdateDto(Integer teamNo, String title) {
      this.teamNo = teamNo;
      this.title = title;
    }
  }

  @Getter
  @NoArgsConstructor
  public static class TeamExitDto {

    Integer teamNo;

  }
}

