package com.ssafy.proma.repository.chat;

import com.ssafy.proma.model.entity.chat.TeamChatRoom;
import com.ssafy.proma.model.entity.team.Team;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamChatRoomRepository extends JpaRepository<TeamChatRoom, Integer> {

  Optional<TeamChatRoom> findByNo(Integer teamNo);
  Optional<TeamChatRoom> findByTeam(Team team);
}
