package com.ssafy.proma.service.sprint;

import com.ssafy.proma.model.dto.sprint.ReqSprintDto;
import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.sprint.SprintRepository;
import com.ssafy.proma.service.AbstractService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SprintService extends AbstractService {

  private final SprintRepository sprintRepository;
  private final ProjectRepository projectRepository;

  public void createSprint(SprintCreateDto sprintCreateDto) {

    String projectNo = sprintCreateDto.getProjectNo();

    Optional<Project> projectOp = projectRepository.getProjectByNo(projectNo);
    Project project = takeOp(projectOp);

    Sprint sprint = sprintCreateDto.toEntity(project);
    sprintRepository.save(sprint);

  }
}
