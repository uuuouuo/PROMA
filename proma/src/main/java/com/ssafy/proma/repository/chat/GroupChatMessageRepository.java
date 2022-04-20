package com.ssafy.proma.repository.chat;


import com.ssafy.proma.model.entity.chat.GroupChatMessage;
import com.ssafy.proma.model.entity.chat.GroupChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupChatMessageRepository extends JpaRepository<GroupChatMessage, Integer> {

  List<GroupChatMessage> findAllByChatRoom(GroupChatRoom chatRoom);
}
