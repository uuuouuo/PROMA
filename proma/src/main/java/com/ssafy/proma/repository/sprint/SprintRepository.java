package com.ssafy.proma.repository.sprint;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint,Integer> {

  Optional<Sprint> getByNo(Integer sprintNo);
  Optional<List<Sprint>> getAllByProject(Project project);
}
