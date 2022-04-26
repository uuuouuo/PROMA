package com.ssafy.proma.repository.project;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.project.UserProject;
import com.ssafy.proma.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProjectRepository extends JpaRepository<UserProject,Integer> {

    List<UserProject> findByProject(Project project);
}
