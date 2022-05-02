package com.ssafy.proma.service.sprint;

import com.ssafy.proma.model.dto.sprint.ReqSprintDto;
import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto;
import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto.SprintUpdateDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintDto;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.sprint.SprintRepository;
import com.ssafy.proma.service.AbstractService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SprintService extends AbstractService {

  private final SprintRepository sprintRepository;
  private final ProjectRepository projectRepository;

  @Transactional
  public void createSprint(SprintCreateDto sprintCreateDto) {

    String projectNo = sprintCreateDto.getProjectNo();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    Sprint sprint = sprintCreateDto.toEntity(project);
    sprintRepository.save(sprint);

  }

  @Transactional
  public void startSprint(Integer sprintNo) {

    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    sprint.toggleStatus();
  }

  @Transactional
  public void updateSprint(Integer sprintNo, SprintUpdateDto sprintUpdateDto) {

    String name = sprintUpdateDto.getTitle();
    String startDate = sprintUpdateDto.getStartDate();
    String endDate = sprintUpdateDto.getEndDate();

    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    sprint.update(name,startDate,endDate);

  }

  public List<SprintDto> getSprintList(String projectNo) {

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    Optional<List<Sprint>> projectListOp = sprintRepository.findAllByProject(project);
    List<Sprint> sprintList = takeOp(projectListOp);

    List<SprintDto> sprintDtoList = sprintList.stream().map(
        sprint -> new SprintDto(sprint.getNo(), sprint.getName(), sprint.getStartDate().toString(),
            sprint.getEndDate().toString(), sprint.isStatus())).collect(
        Collectors.toList());

    return sprintDtoList;
  }
}
