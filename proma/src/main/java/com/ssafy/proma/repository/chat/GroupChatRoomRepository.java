package com.ssafy.proma.repository.chat;

import com.ssafy.proma.model.entity.chat.GroupChatRoom;
import com.ssafy.proma.model.entity.team.Team;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupChatRoomRepository extends JpaRepository<GroupChatRoom, Integer> {

  Optional<GroupChatRoom> findByNo(Integer teamNo);
  Optional<GroupChatRoom> findByTeam(Team team);
}
