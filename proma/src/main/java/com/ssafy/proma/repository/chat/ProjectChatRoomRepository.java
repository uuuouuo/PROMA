package com.ssafy.proma.repository.chat;

import com.ssafy.proma.model.entity.chat.ProjectChatRoom;
import com.ssafy.proma.model.entity.project.Project;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectChatRoomRepository extends JpaRepository<ProjectChatRoom, Integer> {

  Optional<ProjectChatRoom> findByNo(Integer projectNo);
  Optional<ProjectChatRoom> findByProject(Project project);
}
