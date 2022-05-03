package com.ssafy.proma.service.project;

import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectCreateDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectUpdateDto;
import com.ssafy.proma.model.dto.project.ResProjectDto.ProjectDetailDto;
import com.ssafy.proma.model.dto.project.ResProjectDto.ProjectNoTitleDto;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.project.UserProject;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.project.UserProjectRepository;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.service.AbstractService;
import com.ssafy.proma.util.SecurityUtil;
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
  public void joinProject(String projectNo) {

    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    UserProject userProject = UserProject.builder().user(user).project(project).role("MEMBER")
        .build();

    userProjectRepository.save(userProject);

  }

  @Transactional
  public void changeProjectName(ProjectUpdateDto request) {

    String userNo = securityUtil.getCurrentUserNo();

    String projectNo = request.getProjectNo();
    String name = request.getTitle();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);
    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    UserProject userProject = userProjectRepository.findByProjectAndUser(project, user);

    if (userProject.getRole().equals("MANAGER")) {
      project.update(name);
    } else {
      new IllegalStateException("이름 변경은 매니저만 가능합니다.");
    }
  }

  @Transactional
  public void deleteProject(String projectNo) {

    String userNo = securityUtil.getCurrentUserNo();

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);
    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    UserProject userProject = userProjectRepository.findByProjectAndUser(project, user);

    if (userProject.getRole().equals("MANAGER")) {
      project.delete(true);
    } else {
      new IllegalStateException("프로젝트 삭제는 매니저만 가능합니다.");
    }
  }

  public Map<String, Object> getProjectList() throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userOp = userRepository.findByNo(userNo);

    User user = takeOp(userOp);
    List<UserProject> userProjectList = userProjectRepository.findByUser(user);
    List<ProjectNoTitleDto> projectList = userProjectList.stream()
        .filter(project -> !project.getProject().isDeleted()).map(
            project -> new ProjectNoTitleDto(project.getProject().getNo(),
                project.getProject().getName(), project.getRole())).collect(Collectors.toList());
    resultMap.put("projectList", projectList);
    resultMap.put("message", "프로젝트 조회 성공");
    return resultMap;
  }

  public Map<String, Object> getProject(String projectNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    ProjectDetailDto projectDetailDto = new ProjectDetailDto(project.getName());

    resultMap.put("project", projectDetailDto);
    resultMap.put("message", "프로젝트 조회 성공");
    return resultMap;
  }
}
