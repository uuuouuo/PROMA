package com.ssafy.proma.service.project;

import static com.ssafy.proma.exception.Message.PROJECT_CHANGE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_CHANGE_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_DELETE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_DELETE_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_JOIN_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_JOIN_SUCCESS_MESSAGE;

import com.ssafy.proma.model.dto.issue.ResIssueDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectCreateDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectUpdateDto;
import com.ssafy.proma.model.dto.project.ResProjectDto.ProjectDetailDto;

import com.ssafy.proma.model.dto.project.ResProjectDto.ProjectTeamUserDto;
import com.ssafy.proma.model.dto.project.ResProjectDto.TeamMembersDto;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.project.UserProject;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.team.UserTeam;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.project.UserProjectRepository;
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
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService extends AbstractService {

  private final UserRepository userRepository;
  private final ProjectRepository projectRepository;
  private final UserProjectRepository userProjectRepository;
  private final TeamRepository teamRepository;
  private final UserTeamRepository userTeamRepository;
  private final MailService mailService;
  private final SecurityUtil securityUtil;

  @Transactional
  public void createProject(ProjectCreateDto projectDto) {

    String userNo = securityUtil.getCurrentUserNo();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);
    List<String> inviteMails = projectDto.getInviteMails();

    String projectNo = RandomStringUtils.randomAlphanumeric(15);

    Project project = projectDto.toEntity(projectNo);
    UserProject userProject = UserProject.builder().user(user).project(project).role("MANAGER")
        .build();

    projectRepository.save(project);
    userProjectRepository.save(userProject);

    mailService.mailSend(inviteMails, projectNo, user.getNickname());

  }

  @Transactional
  public Map<String, Object> joinProject(String projectNo) {

    Map<String, Object> resultMap = new HashMap<>();

    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    if(project==null) {
      new IllegalStateException(PROJECT_JOIN_ERROR_MESSAGE);
    }
    else {
      UserProject userProject = UserProject.builder().user(user).project(project).role("MEMBER")
          .build();
      userProjectRepository.save(userProject);

      resultMap.put("message",PROJECT_JOIN_SUCCESS_MESSAGE);
    }
    return resultMap;
  }

  @Transactional
  public Map<String, Object> changeProjectName(ProjectUpdateDto request) {

    Map<String, Object> resultMap = new HashMap<>();

    String userNo = securityUtil.getCurrentUserNo();

    String projectNo = request.getProjectNo();
    String name = request.getTitle();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);
    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    if(user==null || user.getIsDeleted() || project == null) {
      new IllegalStateException(PROJECT_CHANGE_ERROR_MESSAGE);
    }
    else {
      UserProject userProject = userProjectRepository.findByProjectAndUser(project, user);

      if (userProject.getRole().equals("MANAGER")) {
        project.update(name);
        resultMap.put("message",PROJECT_CHANGE_SUCCESS_MESSAGE);

      } else {
        new IllegalStateException(PROJECT_CHANGE_ERROR_MESSAGE);
      }
    }
    return resultMap;
  }

  @Transactional
  public Map<String, Object> deleteProject(String projectNo) {

    Map<String, Object> resultMap = new HashMap<>();

    String userNo = securityUtil.getCurrentUserNo();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);
    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    UserProject userProject = userProjectRepository.findByProjectAndUser(project, user);

    if(project == null) new IllegalStateException(PROJECT_DELETE_ERROR_MESSAGE);
    if (userProject.getRole().equals("MANAGER")) {
      project.delete(true);
      resultMap.put("message",PROJECT_DELETE_SUCCESS_MESSAGE);
    } else {
      new IllegalStateException(PROJECT_DELETE_ERROR_MESSAGE);
    }
    return resultMap;
  }

  public Map<String, Object> getProjectList() throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userOp = userRepository.findByNo(userNo);

    User user = takeOp(userOp);
    List<UserProject> userProjectList = userProjectRepository.findByUser(user);

    List<Project> projects = userProjectList.stream()
        .filter(project -> !project.getProject().getIsDeleted()).map(
            project -> project.getProject()).collect(Collectors.toList());

    List<ProjectTeamUserDto> projectTeamUserDtos = new ArrayList<>();

    projects.forEach(project -> {

      Optional<List<Team>> projectOp = teamRepository.findByProject(project);
      List<Team> teams = takeOp(projectOp);

      List<TeamMembersDto> teamMembersDtos = new ArrayList<>();

      teams.forEach(team -> {
        Optional<List<UserTeam>> userTeamOp = userTeamRepository.findByTeam(team);
        List<UserTeam> userTeams = takeOp(userTeamOp);
        List<UserDto> userDtos = userTeams.stream()
            .filter(userTeam -> !userTeam.getUser().getIsDeleted())
            .map(userTeam -> new UserDto(
                userTeam.getUser().getNo()
                , userTeam.getUser().getNickname()
                , userTeam.getUser().getProfileImage()))
            .collect(Collectors.toList());
        Optional<UserTeam> byUserAndTeam = userTeamRepository.findByUserAndTeam(user, team);
        UserTeam userTeamIn = takeOp(byUserAndTeam);
        Boolean isIn = userTeamIn == null ? false : true;
        teamMembersDtos.add(new TeamMembersDto(team.getNo(),team.getName(),isIn,userDtos));
      });
      projectTeamUserDtos.add(new ProjectTeamUserDto(project.getNo(), project.getName(),teamMembersDtos));
    });

    resultMap.put("projectList", projectTeamUserDtos);
    resultMap.put("message", "프로젝트 조회 성공");
    return resultMap;
  }

  public Map<String, Object> getProject(String projectNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userOp = userRepository.findByNo(userNo);

    User user = takeOp(userOp);
    UserProject userProject = userProjectRepository.findByProjectAndUser(project, user);

    ProjectDetailDto projectDetailDto = new ProjectDetailDto(project.getName(), userProject.getRole());

    resultMap.put("project", projectDetailDto);
    resultMap.put("message", "프로젝트 조회 성공");
    return resultMap;
  }

  public Boolean getUserInProject(String projectNo) {

    String userNo = securityUtil.getCurrentUserNo();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);
    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    UserProject userProject = userProjectRepository.findByProjectAndUser(project, user);

    if(userProject==null) {
      return false;
    }
    else {
      return true;
    }

  }
}
