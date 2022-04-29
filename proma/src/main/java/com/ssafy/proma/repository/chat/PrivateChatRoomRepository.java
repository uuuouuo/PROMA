package com.ssafy.proma.repository.chat;

import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import com.ssafy.proma.model.entity.user.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivateChatRoomRepository extends JpaRepository<PrivateChatRoom, Integer> {

  Optional<PrivateChatRoom> findByPublisherAndSubscriber(User pub, User sub);
  Optional<PrivateChatRoom> findByNo(Integer roomNo);
}
