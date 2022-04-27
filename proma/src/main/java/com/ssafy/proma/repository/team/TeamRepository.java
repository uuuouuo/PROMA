package com.ssafy.proma.repository.team;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.team.Team;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {

  Optional<Team> getTeamByNo(Integer teamNo);
  Optional<Team> getTeamByNameAndProject(String name, Project project);
  void deleteTeamByNameAndProject(String name, Project project);

  void deleteTeamByNo(Integer teamNo);

  Optional<List<Team>> getTeamsByProject(Project project);
}
