package com.ssafy.proma.service.sprint;

import static com.ssafy.proma.exception.Message.SPRINT_CREATE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_CREATE_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_DELETE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_DELETE_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_GET_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_GET_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_UPDATE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_UPDATE_SUCCESS_MESSAGE;

import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto;
import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto.SprintUpdateDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintNoTitle;
import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.repository.issue.IssueRepository;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.sprint.SprintRepository;
import com.ssafy.proma.service.AbstractService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ssafy.proma.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SprintService extends AbstractService {

  private final SprintRepository sprintRepository;
  private final ProjectRepository projectRepository;
  private final IssueRepository issueRepository;
  private final NotificationService notificationService;

  @Transactional
  public Map<String, Object> createSprint(SprintCreateDto sprintCreateDto) throws Exception {

    Map<String, Object> resultMap = new HashMap<>();

    String projectNo = sprintCreateDto.getProjectNo();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    if(project == null) {
      new IllegalStateException(SPRINT_CREATE_ERROR_MESSAGE);
    }
    else {
      Sprint sprint = sprintCreateDto.toEntity(project);
      sprintRepository.save(sprint);
      resultMap.put("message",SPRINT_CREATE_SUCCESS_MESSAGE);

    }
    return resultMap;
  }

  @Transactional
  public Map<String, Object> startSprint(Integer sprintNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    if(sprint==null) {
      new IllegalStateException(SPRINT_GET_ERROR_MESSAGE);
    }
    else {
      sprint.toggleStatus();

      notificationService.sendSprintNotification(sprint);

      resultMap.put("message",SPRINT_GET_SUCCESS_MESSAGE);

    }
    return resultMap;
  }

  @Transactional
  public Map<String, Object> updateSprint(Integer sprintNo, SprintUpdateDto sprintUpdateDto) throws Exception {

    Map<String, Object> resultMap = new HashMap<>();

    String name = sprintUpdateDto.getTitle();
    String startDate = sprintUpdateDto.getStartDate();
    String endDate = sprintUpdateDto.getEndDate();

    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    if(sprint==null) {
      new IllegalStateException(SPRINT_UPDATE_ERROR_MESSAGE);
    }
    else {
      sprint.update(name,startDate,endDate);
      resultMap.put("message",SPRINT_UPDATE_SUCCESS_MESSAGE);
    }
    return resultMap;
  }

  public Map<String, Object> getSprintList(String projectNo) throws Exception {

    Map<String, Object> resultMap = new HashMap<>();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    if(project == null) {
      new IllegalStateException(SPRINT_GET_ERROR_MESSAGE);
    }
    else {
      Optional<List<Sprint>> projectListOp = sprintRepository.findAllByProject(project);
      List<Sprint> sprintList = takeOp(projectListOp);

      List<SprintDto> sprintDtoList = sprintList.stream().map(
          sprint -> new SprintDto(sprint.getNo(), sprint.getName(),
              sprint.getStartDate().toString(),
              sprint.getEndDate().toString(), sprint.getStatus())).collect(
          Collectors.toList());

      resultMap.put("sprint", sprintDtoList);
      resultMap.put("message",SPRINT_GET_SUCCESS_MESSAGE);
    }
    return resultMap;
  }

  public Map<String, Object> getDoingSprint(String projectNo) throws Exception {

    Map<String, Object> resultMap = new HashMap<>();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    if(project == null) {
      new IllegalStateException(SPRINT_GET_ERROR_MESSAGE);
    }
    else {
      Optional<Sprint> sprintOp = sprintRepository.findByProjectAndStatus(project,1);
      Sprint sprint = takeOp(sprintOp);

      SprintNoTitle sprintNoTitle = new SprintNoTitle(sprint.getNo(),sprint.getName());

      resultMap.put("sprint", sprintNoTitle);
      resultMap.put("message",SPRINT_GET_SUCCESS_MESSAGE);
    }

    return resultMap;
  }

  @Transactional
  public Map<String, Object> getDeleteSprint(Integer sprintNo) throws Exception {

    Map<String, Object> resultMap = new HashMap<>();
    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    if(sprint==null) {
      new IllegalStateException(SPRINT_DELETE_ERROR_MESSAGE);
    }
    else {
      sprintRepository.delete(sprint);

      Optional<List<Issue>> issueListOp = issueRepository.findBySprint(sprint);
      List<Issue> issues = takeOp(issueListOp);

      issues.forEach(issue->issue.deassignSprint());
      resultMap.put("message",SPRINT_DELETE_SUCCESS_MESSAGE);
    }

    return resultMap;
  }
}
