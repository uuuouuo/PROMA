package com.ssafy.proma.repository.chat;


import com.ssafy.proma.model.entity.chat.ProjectChatMessage;
import com.ssafy.proma.model.entity.chat.ProjectChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectChatMessageRepository extends JpaRepository<ProjectChatMessage, Integer> {

  List<ProjectChatMessage> findAllByChatRoom(ProjectChatRoom chatRoom);
}
