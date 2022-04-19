package com.ssafy.proma.model.Dto.team;

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
    String name;
    String nickname;
    String projectNo;

    public TeamCreateDto(String name, String nickname, String projectNo) {
      this.name = name;
      this.nickname = nickname;
      this.projectNo = projectNo;
    }

    public Team toEntity(Project project) {
      return Team.builder().name(name).project(project).build();
    }

    public UserTeam toEntity(Team team, User user) {
      return UserTeam.builder().team(team).user(user).build();
    }

  }

  @Getter
  @NoArgsConstructor
  public static class TeamJoinDto{

    Integer teamNo;
    String nickname;

    public TeamJoinDto(Integer teamNo, String nickname) {
      this.teamNo = teamNo;
      this.nickname = nickname;
    }
    public UserTeam toEntity(Team team, User user) {
      return UserTeam.builder().team(team).user(user).build();
    }
  }


  @Getter
  @NoArgsConstructor
  public static class TeamUpdateDto {

    String name;

    public TeamUpdateDto(String name) {
      this.name = name;
    }
  }

  @Getter
  @NoArgsConstructor
  public static class TeamExitDto {

    Integer teamNo;
    String nickname;

    public TeamExitDto(Integer teamNo, String nickname) {
      this.teamNo = teamNo;
      this.nickname = nickname;
    }
  }
}

