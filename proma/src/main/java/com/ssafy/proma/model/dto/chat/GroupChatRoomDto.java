package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.dto.chat.GroupChatMessageDto.GroupChatMessageRes;
import com.ssafy.proma.model.entity.chat.GroupChatRoom;
import com.ssafy.proma.model.entity.team.Team;
import java.util.List;
import lombok.Getter;

public class GroupChatRoomDto {

  public static GroupChatRoom toEntity(Team team) {
    return GroupChatRoom.builder().team(team).build();
  }

  @Getter
  public static class GroupChatRoomRes {
    Integer roomNo;
    List<GroupChatMessageRes> messageList;

    public GroupChatRoomRes(Integer roomNo, List<GroupChatMessageRes> messageList) {
      this.roomNo = roomNo;
      this.messageList = messageList;
    }
  }

}
