package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.entity.chat.GroupChatMessage;
import com.ssafy.proma.model.entity.chat.GroupChatRoom;
import com.ssafy.proma.model.entity.user.User;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class GroupChatMessageDto {

  public static GroupChatMessage toEntity(GroupChatRoom chatRoom, User user, String content,
      LocalDateTime time) {
    return GroupChatMessage.builder()
        .chatRoom(chatRoom)
        .user(user)
        .content(content)
        .time(time)
        .build();
  }
  @Getter
  @NoArgsConstructor
  public static class GroupChatMessageReq {

    private Integer roomNo;
    private String pubNo;
    private String content;
    private LocalDateTime time;

    public GroupChatMessageReq(Integer roomNo, String pubNo, String content, LocalDateTime time) {
      this.roomNo = roomNo;
      this.pubNo = pubNo;
      this.content = content;
      this.time = time;
    }
  }

  @Getter
  public static class GroupChatMessageRes {

    private String pubNo;
    private String nickname;
    private String content;
    private LocalDateTime time;

    public GroupChatMessageRes(GroupChatMessage chatMessage) {
      this.pubNo = chatMessage.getUser().getNo();
      this.nickname = chatMessage.getUser().getNickname();
      this.content = chatMessage.getContent();
      this.time = chatMessage.getTime();
    }
  }

}
