package com.ssafy.proma.service.chat;

import static com.ssafy.proma.exception.Message.PROJECT_CHATROOM_SUCCESS_MESSAGE;

import com.ssafy.proma.model.dto.chat.ChatMessageDto;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageListRes;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageReq;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageRes;
import com.ssafy.proma.model.dto.chat.ProjectChatRoomDto;
import com.ssafy.proma.model.dto.chat.ProjectChatRoomDto.ProjectChatRoomRes;
import com.ssafy.proma.model.entity.chat.ProjectChatMessage;
import com.ssafy.proma.model.entity.chat.ProjectChatRoom;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.chat.ProjectChatMessageRepository;
import com.ssafy.proma.repository.chat.ProjectChatRoomRepository;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.user.UserRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectChatService {

  private final UserRepository userRepository;
  private final ProjectRepository projectRepository;
  private final ProjectChatRoomRepository projectChatRoomRepository;
  private final ProjectChatMessageRepository projectChatMessageRepository;

  public Map<String, Object> getProjectChatRoom(String projectNo, Integer lastMsgNo) {

    // project check
    Project project = findProject(projectNo);

    // chatroom check
    ProjectChatRoom chatRoom = projectChatRoomRepository.findByProject(project)
            .orElseGet(() -> creatProjectChatRoom(project));

    // 해당 chatroom 의 messageList 가져오기
    if(lastMsgNo == null) lastMsgNo = Integer.MAX_VALUE;
    List<ProjectChatMessage> msgList
            = projectChatMessageRepository.findByChatRoomAndNoLessThanOrderByTimeDesc(chatRoom, lastMsgNo, PageRequest.of(0, 15)).getContent();

    List<ChatMessageListRes> msgResList = new ArrayList<>();
    if(msgList.size() != 0) {
      msgList.forEach(m -> {
        ChatMessageListRes chatMsgListRes = new ChatMessageListRes(m.getNo(), m.getUser().getNo(),
                m.getUser().getNickname(), m.getContent(), m.getTime());
        msgResList.add(chatMsgListRes);
      });
    }

    ProjectChatRoomRes response = new ProjectChatRoomRes(chatRoom.getNo(), msgResList);

    Map<String, Object> result = new HashMap<>();
    result.put("response", response);
    result.put("message", PROJECT_CHATROOM_SUCCESS_MESSAGE);

    return result;

  }

  public ChatMessageRes saveProjectMessage(ChatMessageReq request) {

    ProjectChatRoom chatRoom = findProjectChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = LocalDateTime.now();

    ChatMessageRes response = new ChatMessageRes(chatRoom.getNo(), user.getNo(),
            user.getNickname(), user.getProfileImage(), content, time);

    ProjectChatMessage chatMessage = ChatMessageDto.toProjectMsgEntity(chatRoom, user, content, time);
    projectChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

    return response;

  }

  private ProjectChatRoom creatProjectChatRoom(Project project) {
    ProjectChatRoom chatRoom = ProjectChatRoomDto.toEntity(project);
    projectChatRoomRepository.save(chatRoom);

    return chatRoom;
  }

  public User findUser(String userNo) {
    return userRepository.findByNo(userNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않은 회원입니다."));
  }

  private Project findProject(String projectNo) {
    return projectRepository.findById(projectNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않은 프로젝트입니다."));
  }

  public ProjectChatRoom findProjectChatRoom(Integer roomNo) {
    return projectChatRoomRepository.findByNo(roomNo)
        .orElseThrow(() -> new IllegalStateException("존재하지 않는 그룹 채팅방입니다."));
  }

}