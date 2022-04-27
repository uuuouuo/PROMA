package com.ssafy.proma.repository.team;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.team.Team;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {

  Optional<Team> findByNo(Integer teamNo);
  Optional<Team> findByNameAndProject(String name, Project project);
  void deleteByNameAndProject(String name, Project project);
  void deleteByNo(Integer teamNo);
  Optional<List<Team>> findByProject(Project project);
}
