package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageListRes;
import com.ssafy.proma.model.entity.chat.ProjectChatRoom;
import com.ssafy.proma.model.entity.project.Project;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class ProjectChatRoomDto {

  public static ProjectChatRoom toEntity(Project project) {
    return ProjectChatRoom.builder().project(project).build();
  }

  @Getter
  @AllArgsConstructor
  public static class ProjectChatRoomRes {
    Integer roomNo;
    Integer memberCount;
    List<ChatMessageListRes> messageList;
  }

}
