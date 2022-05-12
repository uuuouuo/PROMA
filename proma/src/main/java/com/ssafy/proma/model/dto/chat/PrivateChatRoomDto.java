package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageListRes;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import com.ssafy.proma.model.entity.user.User;
import java.util.List;
import lombok.Getter;

public class PrivateChatRoomDto {

  public static PrivateChatRoom toEntity(User pub, User sub) {
    return PrivateChatRoom.builder()
        .publisher(pub).subscriber(sub).build();
  }

  @Getter
  public static class PrivateChatRoomRes {
    Integer roomNo;
    List<ChatMessageListRes> messageList;

    public PrivateChatRoomRes(Integer roomNo, List<ChatMessageListRes> messageList) {
      this.roomNo = roomNo;
      this.messageList = messageList;
    }
  }

}
