package com.ssafy.proma.repository.chat;


import com.ssafy.proma.model.entity.chat.TeamChatMessage;
import com.ssafy.proma.model.entity.chat.TeamChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamChatMessageRepository extends JpaRepository<TeamChatMessage, Integer> {

  List<TeamChatMessage> findAllByChatRoom(TeamChatRoom chatRoom);
}
