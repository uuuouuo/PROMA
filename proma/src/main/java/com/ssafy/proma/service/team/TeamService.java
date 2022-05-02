package com.ssafy.proma.service.team;

import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamCreateDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamExitDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamJoinDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamUpdateDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamMemberDto;
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
import com.ssafy.proma.util.SecurityUtil;

import java.util.*;
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
  private final SecurityUtil securityUtil;

  @Transactional
  public void createTeam(TeamCreateDto teamDto){

    String projectNo = teamDto.getProjectNo();
//    String userNo = teamDto.getUserNo();
    String userNo = securityUtil.getCurrentUserNo();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);
    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);


    Team team = teamDto.toEntity(project);
    UserTeam userTeam = teamDto.toEntity(team, user);
    teamRepository.save(team);
    userTeamRepository.save(userTeam);

  }

  @Transactional
  public void joinTeam(TeamJoinDto teamDto) {

    int teamNo = teamDto.getTeamNo();
//    String userNo = teamDto.getUserNo();
    String userNo = securityUtil.getCurrentUserNo();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    UserTeam userTeam = teamDto.toEntity(team, user);
    userTeamRepository.save(userTeam);

  }

  @Transactional
  public void exitTeam(TeamExitDto teamDto) {

    int teamNo = teamDto.getTeamNo();
//    String userNo = teamDto.getUserNo();
    String userNo = securityUtil.getCurrentUserNo();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    userTeamRepository.deleteByUserAndTeam(user,team);

  }

  @Transactional
  public void deleteTeam(Integer teamNo) {

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    issueRepository.deleteAllByTeam(team);
    userTeamRepository.deleteAllByTeam(team);
    teamRepository.deleteByNo(teamNo);

  }

  @Transactional
  public void updateTeam(TeamUpdateDto teamDto) {

    Integer teamNo = teamDto.getTeamNo();
    String name = teamDto.getTitle();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    team.update(name);

  }

  public List<TeamDto> getTeamList(String projectNo) {

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    Optional<List<Team>> teamListOp = teamRepository.findByProject(project);
    List<Team> teams = takeOp(teamListOp);

    List<TeamDto> teamDtoList = teams.stream().map(team -> new TeamDto(team))
        .collect(Collectors.toList());

    return teamDtoList;

  }

  public Map<String, Object> getUserTeamList(Integer teamNo) {

    Map<String, Object> resultMap = new HashMap<>();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    Optional<List<UserTeam>> userTeamOp = userTeamRepository.findByTeam(team);
    List<UserTeam> userTeamList = takeOp(userTeamOp);

    //탈퇴 회원 필터링 필요
    List<TeamMemberDto> teamMemberDtoList = userTeamList.stream()
            .filter(member -> !member.getUser().isDeleted())
            .map(member -> new TeamMemberDto(member.getUser().getNo(), member.getUser().getNickname(), member.getUser().getProfileImage()))
            .collect(Collectors.toList());


    resultMap.put("memberList", teamMemberDtoList);
    resultMap.put("message", "팀원 조회 성공");
    return resultMap;
  }

  public Map<String, Object> getTeam(Integer teamNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    TeamDto teamDto = new TeamDto(teamNo, team.getName());
    
    resultMap.put("team", teamDto);
    resultMap.put("message", "팀 조회 성공");
    return resultMap;
  }
}
