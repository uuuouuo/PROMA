package com.ssafy.proma.service.project;

import com.ssafy.proma.model.dto.project.ReqProjectDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectCreateDto;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.project.UserProject;
import com.ssafy.proma.model.entity.project.UserProject.UserProjectBuilder;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.project.UserProjectRepository;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.service.AbstractService;
import java.util.List;
import java.util.Optional;
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

  @Transactional
  public void createProject(ProjectCreateDto projectDto) {

    Optional<User> userOp = userRepository.getUserByNo("1");
    User user = takeOp(userOp);
    List<String> inviteMails = projectDto.getInviteMails();

    String projectNo = RandomStringUtils.randomAlphanumeric(15);

    Project project = projectDto.toEntity(projectNo);


    UserProject userProject = UserProject.builder().user(user).project(project).build();

    projectRepository.save(project);
    userProjectRepository.save(userProject);

    mailService.mailSend(inviteMails,projectNo,user.getNickname());

  }

  @Transactional
  public void joinProject(String projectNo) {

    Optional<User> userOp = userRepository.getUserByNo("2");
    User user = takeOp(userOp);

    Optional<Project> projectOp = projectRepository.getProjectByNo(projectNo);
    Project project = takeOp(projectOp);

    UserProject userProject = UserProject.builder().user(user).project(project).build();

    userProjectRepository.save(userProject);

  }

  public void getProjectList() {

    Optional<User> userOp = userRepository.getUserByNo("1");
    User user = takeOp(userOp);

//    Optional<List<UserProject>> UserProjectListOp = userProjectRepository.

  }
}
