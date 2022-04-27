package com.ssafy.proma.repository.chat;


import com.ssafy.proma.model.entity.chat.PrivateChatMessage;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivateChatMessageRepository extends JpaRepository<PrivateChatMessage, Integer> {

//  List<PrivateChatMessage> findAllByPrivateChatRoom(PrivateChatRoom chatRoom);
//  void findAllBy
  List<PrivateChatMessage> findAllByChatRoom(PrivateChatRoom privateChatRoom);
}
