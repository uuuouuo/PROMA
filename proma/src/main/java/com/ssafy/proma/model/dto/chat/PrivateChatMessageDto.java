package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.entity.chat.PrivateChatMessage;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import com.ssafy.proma.model.entity.user.User;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PrivateChatMessageDto {

  public static PrivateChatMessage toEntity(PrivateChatRoom chatRoom, User user, String content,
      LocalDateTime time) {
    return PrivateChatMessage.builder()
        .chatRoom(chatRoom)
        .user(user)
        .content(content)
        .time(time)
        .build();
  }

  @Getter
  @NoArgsConstructor
  public static class PrivateChatMessageReq {

    private Integer roomNo;
    private String pubNo;
    private String content;
    private LocalDateTime time;

    public PrivateChatMessageReq(Integer roomNo, String pubNo, String content, LocalDateTime time) {
      this.roomNo = roomNo;
      this.pubNo = pubNo;
      this.content = content;
      this.time = time;
    }
  }

  @Getter
  public static class PrivateChatMessageRes {

    private String pubNo;
    private String nickname;
    private String content;
    private LocalDateTime time;

    public PrivateChatMessageRes(PrivateChatMessage chatMessage) {
      this.pubNo = chatMessage.getUser().getNo();
      this.nickname = chatMessage.getUser().getNickname();
      this.content = chatMessage.getContent();
      this.time = chatMessage.getTime();
    }
  }

}
