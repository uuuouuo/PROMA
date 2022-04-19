package com.ssafy.proma.service.team;

import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamCreateDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamExitDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamJoinDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamUpdateDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamDto;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.team.UserTeam;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.issue.IssueRepository;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.repository.team.UserTeamRepository;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.service.AbstractService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamService extends AbstractService {

  private final TeamRepository teamRepository;
  private final UserRepository userRepository;
  private final ProjectRepository projectRepository;
  private final UserTeamRepository userTeamRepository;
  private final IssueRepository issueRepository;


  @Transactional
  public void createTeam(TeamCreateDto teamDto){

    String projectNo = teamDto.getProjectNo();
    String NickName = teamDto.getNickname();

    Optional<Project> projectOp = projectRepository.getProjectByNo(projectNo);
    Project project = takeOp(projectOp);
    Optional<User> userOp = userRepository.getUserByNickname(NickName);
    User user = takeOp(userOp);


    Team team = teamDto.toEntity(project);
    UserTeam userTeam = teamDto.toEntity(team, user);
    teamRepository.save(team);
    userTeamRepository.save(userTeam);

  }

  @Transactional
  public void joinTeam(TeamJoinDto teamDto) {

    int teamNo = teamDto.getTeamNo();
    String NickName = teamDto.getNickname();

    Optional<User> userOp = userRepository.getUserByNickname(NickName);
    User user = takeOp(userOp);

    Optional<Team> teamOp = teamRepository.getTeamByNo(teamNo);
    Team team = takeOp(teamOp);

    UserTeam userTeam = teamDto.toEntity(team, user);
    userTeamRepository.save(userTeam);

  }

  @Transactional
  public void exitTeam(TeamExitDto teamDto) {

    int teamNo = teamDto.getTeamNo();
    String NickName = teamDto.getNickname();

    Optional<User> userOp = userRepository.getUserByNickname(NickName);
    User user = takeOp(userOp);

    Optional<Team> teamOp = teamRepository.getTeamByNo(teamNo);
    Team team = takeOp(teamOp);

    userTeamRepository.deleteUserTeamByUserAndTeam(user,team);

  }

  @Transactional
  public void deleteTeam(Integer teamNo) {

    Optional<Team> teamOp = teamRepository.getTeamByNo(teamNo);
    Team team = takeOp(teamOp);

    issueRepository.deleteAllByTeam(team);
    userTeamRepository.deleteAllByTeam(team);
    teamRepository.deleteTeamByNo(teamNo);

  }

  @Transactional
  public void updateTeam(Integer teamNo, TeamUpdateDto teamDto) {

    String name = teamDto.getName();

    Optional<Team> teamOp = teamRepository.getTeamByNo(teamNo);
    Team team = takeOp(teamOp);

    team.update(name);

  }

  public List<TeamDto> getTeamList(String projectNo) {

    Optional<Project> projectOp = projectRepository.getProjectByNo(projectNo);
    Project project = takeOp(projectOp);

    Optional<List<Team>> teamListOp = teamRepository.getTeamsByProject(project);
    List<Team> teams = takeOp(teamListOp);

    List<TeamDto> teamDtoList = teams.stream().map(team -> new TeamDto(team))
        .collect(Collectors.toList());

    return teamDtoList;

  }

  public List<String> getUserTeamList(int teamNo) {

    Optional<Team> teamOp = teamRepository.getTeamByNo(teamNo);
    Team team = takeOp(teamOp);

    Optional<List<UserTeam>> userTeamOp = userTeamRepository.getUserTeamsByTeam(team);
    List<UserTeam> userTeamList = takeOp(userTeamOp);

    List<String> userNicknameList = new ArrayList<>();

    userTeamList.forEach(userTeam->{
      userNicknameList.add(userTeam.getUser().getNickname());
    });

    return userNicknameList;
  }
}
