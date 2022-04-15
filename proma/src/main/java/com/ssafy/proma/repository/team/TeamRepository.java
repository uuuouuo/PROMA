package com.ssafy.proma.repository.team;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.team.Team;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {

  Optional<Team> getTeamByNo(Integer teamNo);

  Optional<Team> getTeamByNameAndProject(String name, Project project);

}
