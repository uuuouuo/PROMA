package com.ssafy.proma.repository.project;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.project.UserProject;
import com.ssafy.proma.model.entity.user.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProjectRepository extends JpaRepository<UserProject,Integer> {

    List<UserProject> findByProject(Project project);
    UserProject findByProjectAndUser(Project project, User user);
    List<UserProject> findByUser(User user);
}
