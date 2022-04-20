package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto.PrivateChatMessageRes;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import com.ssafy.proma.model.entity.user.User;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PrivateChatRoomDto {

  public static PrivateChatRoom toEntity(User pub, User sub) {
    return PrivateChatRoom.builder()
        .publisher(pub).subscriber(sub).build();
  }

  @Getter
  @NoArgsConstructor
  public static class PrivateChatRoomReq {
    String pubNo;
    String subNo;

    public PrivateChatRoomReq(String pubNo, String subNo) {
      this.pubNo = pubNo;
      this.subNo = subNo;
    }
  }

  @Getter
  public static class PrivateChatRoomRes {
    Integer roomNo;
    List<PrivateChatMessageRes> messageList;

    public PrivateChatRoomRes(Integer roomNo, List<PrivateChatMessageRes> messageList) {
      this.roomNo = roomNo;
      this.messageList = messageList;
    }
  }

}
