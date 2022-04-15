package com.ssafy.proma.model.Dto.Team;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.team.UserTeam;
import com.ssafy.proma.model.entity.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TeamDto {

  String name;
  String nickname;
  String projectNo;

  public TeamDto(String name, String nickname, String projectNo) {
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

