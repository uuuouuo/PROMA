package com.ssafy.proma.service.chat;

import static com.ssafy.proma.exception.Message.PROJECT_CHATROOM_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.TEAM_CHATROOM_SUCCESS_MESSAGE;

import com.ssafy.proma.model.dto.chat.ChatMessageDto;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageListRes;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageReq;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageRes;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomRes;
import com.ssafy.proma.model.dto.chat.ProjectChatRoomDto;
import com.ssafy.proma.model.dto.chat.ProjectChatRoomDto.ProjectChatRoomRes;
import com.ssafy.proma.model.dto.chat.TeamChatRoomDto;
import com.ssafy.proma.model.dto.chat.TeamChatRoomDto.TeamChatRoomRes;
import com.ssafy.proma.model.entity.chat.PrivateChatMessage;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import com.ssafy.proma.model.entity.chat.ProjectChatMessage;
import com.ssafy.proma.model.entity.chat.ProjectChatRoom;
import com.ssafy.proma.model.entity.chat.TeamChatMessage;
import com.ssafy.proma.model.entity.chat.TeamChatRoom;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.chat.PrivateChatMessageRepository;
import com.ssafy.proma.repository.chat.PrivateChatRoomRepository;
import com.ssafy.proma.repository.chat.ProjectChatMessageRepository;
import com.ssafy.proma.repository.chat.ProjectChatRoomRepository;
import com.ssafy.proma.repository.chat.TeamChatMessageRepository;
import com.ssafy.proma.repository.chat.TeamChatRoomRepository;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.util.SecurityUtil;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

  private final UserRepository userRepository;
  private final TeamRepository teamRepository;
  private final ProjectRepository projectRepository;
  private final PrivateChatRoomRepository privateChatRoomRepository;
  private final PrivateChatMessageRepository privateChatMessageRepository;
  private final TeamChatRoomRepository teamChatRoomRepository;
  private final TeamChatMessageRepository teamChatMessageRepository;
  private final ProjectChatRoomRepository projectChatRoomRepository;
  private final ProjectChatMessageRepository projectChatMessageRepository;

  public Map<String, Object> getPrivateChatRoom(String subNo, Integer lastMsgNo) {

    // user check
    User pub = findUser(SecurityUtil.getCurrentUserNo());
    User sub = findUser(subNo);

    // chatroom check
    PrivateChatRoom chatRoom = null;
    if(pub.getNo().compareTo(sub.getNo()) > 0) {
      chatRoom = privateChatRoomRepository.findByPublisherAndSubscriber(pub, sub)
              .orElseGet(() -> createPrivateChatRoom(pub, sub));
    } else {
      chatRoom = privateChatRoomRepository.findByPublisherAndSubscriber(sub, pub)
              .orElseGet(() -> createPrivateChatRoom(sub, pub));
    }

    // 해당 chatroom 의 messageList 가져오기
    if(lastMsgNo == null) lastMsgNo = Integer.MAX_VALUE;
    List<PrivateChatMessage> msgList = new ArrayList<>();
    msgList = privateChatMessageRepository.findByChatRoomAndNoLessThanOrderByTimeDesc(chatRoom, lastMsgNo, PageRequest.of(0,15)).getContent();

    List<ChatMessageListRes> msgResList = new ArrayList<>();
    if(msgList.size() != 0) {
      msgList.forEach(m -> {
        ChatMessageListRes chatMsgListRes = new ChatMessageListRes(m.getNo(), m.getUser().getNo(),
                m.getUser().getNickname(), m.getContent(), m.getTime());
        msgResList.add(chatMsgListRes);
      });
    }

    PrivateChatRoomRes response = new PrivateChatRoomRes(chatRoom.getNo(), msgResList);

    Map<String, Object> result = new HashMap<>();
    result.put("response", response);
    result.put("message", TEAM_CHATROOM_SUCCESS_MESSAGE);

    return result;

  }

  public Map<String, Object> getTeamChatRoom(Integer teamNo, Integer lastMsgNo) {

    // team check
    Team team = findTeam(teamNo);

    // chatroom check
    TeamChatRoom chatRoom = teamChatRoomRepository.findByTeam(team)
            .orElseGet(() -> creatTeamChatRoom(team));

    // 해당 chatroom 의 messageList 가져오기
    if(lastMsgNo == null) lastMsgNo = Integer.MAX_VALUE;
    List<TeamChatMessage> msgList = new ArrayList<>();
    msgList = teamChatMessageRepository.findByChatRoomAndNoLessThanOrderByTimeDesc(chatRoom, lastMsgNo, PageRequest.of(0,15)).getContent();

    List<ChatMessageListRes> msgResList = new ArrayList<>();
    if(msgList.size() != 0) {
      msgList.forEach(m -> {
        ChatMessageListRes chatMsgListRes = new ChatMessageListRes(m.getNo(), m.getUser().getNo(),
                m.getUser().getNickname(), m.getContent(), m.getTime());
        msgResList.add(chatMsgListRes);
      });
    }

    TeamChatRoomRes response = new TeamChatRoomRes(chatRoom.getNo(), msgResList);

    Map<String, Object> result = new HashMap<>();
    result.put("response", response);
    result.put("message", TEAM_CHATROOM_SUCCESS_MESSAGE);

    return result;

  }

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

  public ChatMessageRes savePrivateMessage(ChatMessageReq request) {

    PrivateChatRoom chatRoom = findPrivateChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = LocalDateTime.now();

    ChatMessageRes response = new ChatMessageRes(chatRoom.getNo(), user.getNo(),
            user.getNickname(), content, time);

    PrivateChatMessage chatMessage = ChatMessageDto.toPrivateMsgEntity(chatRoom, user, content, time);
    privateChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

    return response;

  }

  public ChatMessageRes saveTeamMessage(ChatMessageReq request) {

    TeamChatRoom chatRoom = findTeamChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = LocalDateTime.now();

    ChatMessageRes response = new ChatMessageRes(chatRoom.getNo(), user.getNo(),
            user.getNickname(), content, time);

    TeamChatMessage chatMessage = ChatMessageDto.toTeamMsgEntity(chatRoom, user, content, time);
    teamChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

    return response;

  }

  public ChatMessageRes saveProjectMessage(ChatMessageReq request) {

    ProjectChatRoom chatRoom = findProjectChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = LocalDateTime.now();

    ChatMessageRes response = new ChatMessageRes(chatRoom.getNo(), user.getNo(),
            user.getNickname(), content, time);

    ProjectChatMessage chatMessage = ChatMessageDto.toProjectMsgEntity(chatRoom, user, content, time);
    projectChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

    return response;

  }

  public PrivateChatRoom createPrivateChatRoom(User pub, User sub) {
    PrivateChatRoom chatRoom = PrivateChatRoomDto.toEntity(pub, sub);
    privateChatRoomRepository.save(chatRoom);

    return chatRoom;
  }

  private TeamChatRoom creatTeamChatRoom(Team team) {
    TeamChatRoom chatRoom = TeamChatRoomDto.toEntity(team);
    teamChatRoomRepository.save(chatRoom);

    return chatRoom;
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

  private Team findTeam(Integer teamNo) {
    return teamRepository.findById(teamNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않은 팀입니다."));
  }

  private Project findProject(String projectNo) {
    return projectRepository.findById(projectNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않은 팀입니다."));
  }

  public PrivateChatRoom findPrivateChatRoom(Integer roomNo) {
    return privateChatRoomRepository.findByNo(roomNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않는 개인 채팅방입니다."));
  }

  public TeamChatRoom findTeamChatRoom(Integer roomNo) {
    return teamChatRoomRepository.findByNo(roomNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않는 그룹 채팅방입니다."));
  }

  public ProjectChatRoom findProjectChatRoom(Integer roomNo) {
    return projectChatRoomRepository.findByNo(roomNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않는 그룹 채팅방입니다."));
  }


}