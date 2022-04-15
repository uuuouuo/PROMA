package com.ssafy.proma.repository.project;

import com.ssafy.proma.model.entity.project.Project;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,String> {

  Optional<Project> getProjectByNo(String projectNo);

}
