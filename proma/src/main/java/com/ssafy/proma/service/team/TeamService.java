package com.ssafy.proma.service.team;

import com.ssafy.proma.exception.Message;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamCreateDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamExitDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamJoinDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamUpdateDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamMemberDto;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
  private final SecurityUtil securityUtil;

  @Transactional
  public Map<String, Object> createTeam(TeamCreateDto teamDto){

    Map<String, Object> resultMap = new HashMap<>();

    String projectNo = teamDto.getProjectNo();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    Team team = teamDto.toEntity(project);
    teamRepository.save(team);

    resultMap.put("message", Message.TEAM_CREATE_SUCCESS_MESSAGE);
    return resultMap;
  }

  @Transactional
  public Map<String, Object> joinTeam(TeamJoinDto teamDto) {

    Map<String, Object> resultMap = new HashMap<>();

    int teamNo = teamDto.getTeamNo();
    String userNo = securityUtil.getCurrentUserNo();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    UserTeam userTeam = teamDto.toEntity(team, user);
    userTeamRepository.save(userTeam);

    resultMap.put("message", Message.TEAM_JOIN_SUCCESS_MESSAGE);
    return resultMap;
  }

  @Transactional
  public Map<String, Object> exitTeam(TeamExitDto teamDto) {

    Map<String, Object> resultMap = new HashMap<>();

    int teamNo = teamDto.getTeamNo();
    String userNo = securityUtil.getCurrentUserNo();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    userTeamRepository.deleteByUserAndTeam(user,team); //존재하지 않는 팀이어도 에러 없음

    resultMap.put("message", Message.TEAM_EXIT_SUCCESS_MESSAGE);
    return resultMap;
  }

  @Transactional
  public Map<String, Object> deleteTeam(Integer teamNo) {

    Map<String, Object> resultMap = new HashMap<>();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    issueRepository.deleteAllByTeam(team);
    userTeamRepository.deleteAllByTeam(team);
    teamRepository.deleteByNo(teamNo);

    resultMap.put("message", Message.TEAM_DELETE_SUCCESS_MESSAGE);
    return resultMap;
  }

  @Transactional
  public Map<String, Object> updateTeam(TeamUpdateDto teamDto) {

    Map<String, Object> resultMap = new HashMap<>();

    Integer teamNo = teamDto.getTeamNo();
    String name = teamDto.getTitle();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    team.update(name);

    resultMap.put("message", Message.TEAM_UPDATE_SUCCESS_MESSAGE);
    return resultMap;
  }

  public Map<String, Object> getTeamList(String projectNo) {


    Map<String, Object> resultMap = new HashMap<>();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    Optional<List<Team>> teamListOp = teamRepository.findByProject(project);
    List<Team> teams = takeOp(teamListOp);

    // 유저가 속한 팀 확인
    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    List<TeamDto> teamDtoList = new ArrayList<>();
    teams.forEach(team -> {
      Optional<UserTeam> userTeamOp = userTeamRepository.findByUserAndTeam(user, team);
      UserTeam userTeam = takeOp(userTeamOp);

      if(userTeam.getTeam() == team) {
        TeamDto teamDto = new TeamDto(team.getNo(), team.getName(), true);
        teamDtoList.add(teamDto);
      } else {
        TeamDto teamDto = new TeamDto(team.getNo(), team.getName(), false);
        teamDtoList.add(teamDto);
      }
    });

    resultMap.put("teamList", teamDtoList);
    resultMap.put("message", Message.TEAM_FIND_SUCCESS_MESSAGE);
    return resultMap;

  }

  public Map<String, Object> getUserTeamList(Integer teamNo) {

    Map<String, Object> resultMap = new HashMap<>();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    Optional<List<UserTeam>> userTeamOp = userTeamRepository.findByTeam(team);
    List<UserTeam> userTeamList = takeOp(userTeamOp);

    //탈퇴 회원 필터링 필요
    List<TeamMemberDto> teamMemberDtoList = userTeamList.stream()
            .filter(member -> !member.getUser().getIsDeleted())
            .map(member -> new TeamMemberDto(member.getUser().getNo(), member.getUser().getNickname(), member.getUser().getProfileImage()))
            .collect(Collectors.toList());


    resultMap.put("memberList", teamMemberDtoList);
    resultMap.put("message", Message.MEMBER_FIND_SUCCESS_MESSAGE);
    return resultMap;
  }

  public Map<String, Object> getTeam(Integer teamNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    // 유저가 속한 팀 확인
    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<UserTeam> userTeamOp = userTeamRepository.findByUserAndTeam(user, team);
    UserTeam userTeam = takeOp(userTeamOp);

    TeamDto teamDto;
    if(userTeam.getTeam() == team) {
      teamDto = new TeamDto(teamNo, team.getName(), true);
    } else {
      teamDto = new TeamDto(teamNo, team.getName(), false);
    }

    resultMap.put("team", teamDto);
    resultMap.put("message", Message.TEAM_FIND_SUCCESS_MESSAGE);
    return resultMap;
  }
}
