package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.dto.chat.TeamChatMessageDto.TeamChatMessageRes;
import com.ssafy.proma.model.entity.chat.TeamChatRoom;
import com.ssafy.proma.model.entity.team.Team;
import java.util.List;
import lombok.Getter;

public class TeamChatRoomDto {

  public static TeamChatRoom toEntity(Team team) {
    return TeamChatRoom.builder().team(team).build();
  }

  @Getter
  public static class TeamChatRoomRes {
    Integer roomNo;
    List<TeamChatMessageRes> messageList;

    public TeamChatRoomRes(Integer roomNo, List<TeamChatMessageRes> messageList) {
      this.roomNo = roomNo;
      this.messageList = messageList;
    }
  }

}
