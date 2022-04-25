package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.entity.chat.TeamChatMessage;
import com.ssafy.proma.model.entity.chat.TeamChatRoom;
import com.ssafy.proma.model.entity.user.User;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class TeamChatMessageDto {

  public static TeamChatMessage toEntity(TeamChatRoom chatRoom, User user, String content,
      LocalDateTime time) {
    return TeamChatMessage.builder()
        .chatRoom(chatRoom)
        .user(user)
        .content(content)
        .time(LocalDateTime.now())
        .build();
  }
  @Getter
  @NoArgsConstructor
  public static class TeamChatMessageReq {

    private Integer roomNo;
    private String pubNo;
    private String content;
    private LocalDateTime time;

    public TeamChatMessageReq(Integer roomNo, String pubNo, String content, LocalDateTime time) {
      this.roomNo = roomNo;
      this.pubNo = pubNo;
      this.content = content;
      this.time = time;
    }
  }

  @Getter
  public static class TeamChatMessageRes {

    private String pubNo;
    private String nickname;
    private String content;
    private LocalDateTime time;

    public TeamChatMessageRes(TeamChatMessage chatMessage) {
      this.pubNo = chatMessage.getUser().getNo();
      this.nickname = chatMessage.getUser().getNickname();
      this.content = chatMessage.getContent();
      this.time = chatMessage.getTime();
    }
  }

}
