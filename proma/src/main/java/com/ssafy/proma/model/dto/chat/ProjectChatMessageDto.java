package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.entity.chat.ProjectChatMessage;
import com.ssafy.proma.model.entity.chat.ProjectChatRoom;
import com.ssafy.proma.model.entity.user.User;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ProjectChatMessageDto {

  public static ProjectChatMessage toEntity(ProjectChatRoom chatRoom, User user, String content,
      LocalDateTime time) {
    return ProjectChatMessage.builder()
        .chatRoom(chatRoom)
        .user(user)
        .content(content)
        .time(time)
        .build();
  }
  @Getter
  @NoArgsConstructor
  public static class ProjectChatMessageReq {

    private Integer roomNo;
    private String pubNo;
    private String content;
    private LocalDateTime time;

    public ProjectChatMessageReq(Integer roomNo, String pubNo, String content, LocalDateTime time) {
      this.roomNo = roomNo;
      this.pubNo = pubNo;
      this.content = content;
      this.time = time;
    }
  }

  @Getter
  public static class ProjectChatMessageRes {

    private String pubNo;
    private String nickname;
    private String content;
    private LocalDateTime time;

    public ProjectChatMessageRes(ProjectChatMessage chatMessage) {
      this.pubNo = chatMessage.getUser().getNo();
      this.nickname = chatMessage.getUser().getNickname();
      this.content = chatMessage.getContent();
      this.time = chatMessage.getTime();
    }
  }

}
