package com.ssafy.proma.repository.chat;


import com.ssafy.proma.model.entity.chat.PrivateChatMessage;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivateChatMessageRepository extends JpaRepository<PrivateChatMessage, Integer> {

//  List<PrivateChatMessage> findAllByChatRoom(PrivateChatRoom privateChatRoom);
  Page<List<PrivateChatMessage>> findByChatRoomOrderByTimeDesc(PrivateChatRoom privateChatRoom, Pageable pageable);
}
