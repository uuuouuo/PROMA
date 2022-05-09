package com.ssafy.proma.repository.chat;


import com.ssafy.proma.model.entity.chat.ProjectChatMessage;
import com.ssafy.proma.model.entity.chat.ProjectChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectChatMessageRepository extends JpaRepository<ProjectChatMessage, Integer> {

  Page<ProjectChatMessage> findByChatRoomOrderByTimeDesc(ProjectChatRoom projectChatRoom, Pageable pageable);

}
