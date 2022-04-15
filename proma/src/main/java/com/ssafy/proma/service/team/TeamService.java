package com.ssafy.proma.service.team;

import com.ssafy.proma.model.Dto.Team.TeamDto;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.team.UserTeam;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.repository.team.UserTeamRepository;
import com.ssafy.proma.repository.user.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamService {

  private final TeamRepository teamRepository;
  private final UserRepository userRepository;
  private final ProjectRepository projectRepository;
  private final UserTeamRepository userTeamRepository;

  @Transactional
  public void createTeam(TeamDto teamDto){

    String projectNo = teamDto.getProjectNo();
    String NickName = teamDto.getNickname();

    Optional<Project> projectOp = projectRepository.getProjectByNo(projectNo);
    Project project = projectOp.isPresent() ? projectOp.get() : null;

    Optional<User> userOp = userRepository.getUserByNickname(NickName);
    User user = userOp.isPresent() ? userOp.get() : null;

    Team team = teamDto.toEntity(project);
    UserTeam userTeam = teamDto.toEntity(team, user);
    teamRepository.save(team);
    userTeamRepository.save(userTeam);

  }

  @Transactional
  public void joinTeam(TeamDto teamDto) {

    String name = teamDto.getName();
    String projectNo = teamDto.getProjectNo();
    String NickName = teamDto.getNickname();

    Optional<Project> projectOp = projectRepository.getProjectByNo(projectNo);
    Project project = projectOp.isPresent() ? projectOp.get() : null;

    Optional<User> userOp = userRepository.getUserByNickname(NickName);
    User user = userOp.isPresent() ? userOp.get() : null;

    Optional<Team> teamOp = teamRepository.getTeamByNameAndProject(name, project);
    Team team = teamOp.isPresent() ? teamOp.get() : null;

    System.out.println(team);

    UserTeam userTeam = teamDto.toEntity(team, user);
    userTeamRepository.save(userTeam);

  }
}
