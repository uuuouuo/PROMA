package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.entity.chat.PrivateChatMessage;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import com.ssafy.proma.model.entity.chat.ProjectChatMessage;
import com.ssafy.proma.model.entity.chat.ProjectChatRoom;
import com.ssafy.proma.model.entity.chat.TeamChatMessage;
import com.ssafy.proma.model.entity.chat.TeamChatRoom;
import com.ssafy.proma.model.entity.user.User;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChatMessageDto {

  public static PrivateChatMessage toPrivateMsgEntity(PrivateChatRoom chatRoom, User user, String content,
      LocalDateTime time) {

    return PrivateChatMessage.builder()
        .chatRoom(chatRoom)
        .user(user)
        .content(content)
        .time(time)
        .build();
  }

  public static TeamChatMessage toTeamMsgEntity(TeamChatRoom chatRoom, User user
      , String content, LocalDateTime time) {
    return TeamChatMessage.builder()
        .chatRoom(chatRoom)
        .user(user)
        .content(content)
        .time(time)
        .build();
  }

  public static ProjectChatMessage toProjectMsgEntity(ProjectChatRoom chatRoom, User user
      , String content, LocalDateTime time) {
    return ProjectChatMessage.builder()
        .chatRoom(chatRoom)
        .user(user)
        .content(content)
        .time(time)
        .build();
  }

  @Getter
  @NoArgsConstructor
  public static class ChatMessageReq {

    private Integer roomNo;
    private String pubNo;
    private String content;

    public ChatMessageReq(Integer roomNo, String pubNo, String content) {
      this.roomNo = roomNo;
      this.pubNo = pubNo;
      this.content = content;
    }
  }

  @Getter
  public static class ChatMessageRes {

    private Integer roomNo;
    private String pubNo;
    private String nickname;
    private String profileImage;
    private String content;
    private LocalDateTime time;

    public ChatMessageRes(Integer roomNo, String pubNo, String nickname, String profileImage, String content, LocalDateTime time) {
      this.roomNo = roomNo;
      this.pubNo = pubNo;
      this.nickname = nickname;
      this.profileImage = profileImage;
      this.content = content;
      this.time = time;
    }
  }

  @Getter
  @AllArgsConstructor
  public static class ChatMessageListRes {

    private Integer msgNo;
    private String pubNo;
    private String nickname;
    private String content;
    private LocalDateTime time;
  }

}
