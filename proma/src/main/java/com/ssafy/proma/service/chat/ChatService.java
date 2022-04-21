package com.ssafy.proma.service.chat;

import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto;
import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto.PrivateChatMessageReq;
import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto.PrivateChatMessageRes;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomReq;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomRes;
import com.ssafy.proma.model.dto.chat.ProjectChatMessageDto;
import com.ssafy.proma.model.dto.chat.ProjectChatMessageDto.ProjectChatMessageReq;
import com.ssafy.proma.model.dto.chat.ProjectChatMessageDto.ProjectChatMessageRes;
import com.ssafy.proma.model.dto.chat.ProjectChatRoomDto;
import com.ssafy.proma.model.dto.chat.ProjectChatRoomDto.ProjectChatRoomRes;
import com.ssafy.proma.model.dto.chat.TeamChatMessageDto;
import com.ssafy.proma.model.dto.chat.TeamChatMessageDto.TeamChatMessageReq;
import com.ssafy.proma.model.dto.chat.TeamChatMessageDto.TeamChatMessageRes;
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
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
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

  public PrivateChatRoomRes getPrivateChatRoom(PrivateChatRoomReq request) {

    // user check
    User pub = findUser(request.getPubNo());
    User sub = findUser(request.getSubNo());

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
    List<PrivateChatMessageRes> msgResList =
        privateChatMessageRepository.findAllByChatRoom(chatRoom)
        .stream().map(PrivateChatMessageRes::new)
        .collect(Collectors.toList());

    return new PrivateChatRoomRes(chatRoom.getNo(), msgResList);

  }

  public TeamChatRoomRes getTeamChatRoom(Integer teamNo) {

    // team check
    Team team = findTeam(teamNo);

    // chatroom check
    TeamChatRoom chatRoom = teamChatRoomRepository.findByTeam(team)
        .orElseGet(() -> creatTeamChatRoom(team));

    // 해당 chatroom 의 messageList 가져오기
    List<TeamChatMessageRes> msgList =
        teamChatMessageRepository.findAllByChatRoom(chatRoom)
        .stream().map(TeamChatMessageRes::new)
        .collect(Collectors.toList());

    return new TeamChatRoomRes(chatRoom.getNo(), msgList);

  }

  public ProjectChatRoomRes getProjectChatRoom(String projectNo) {

    // project check
    Project project = findProject(projectNo);

    // chatroom check
    ProjectChatRoom chatRoom = projectChatRoomRepository.findByProject(project)
        .orElseGet(() -> creatProjectChatRoom(project));

    // 해당 chatroom 의 messageList 가져오기
    List<ProjectChatMessageRes> msgList
        = projectChatMessageRepository.findAllByChatRoom(chatRoom)
        .stream().map(ProjectChatMessageRes::new)
        .collect(Collectors.toList());

    return new ProjectChatRoomRes(chatRoom.getNo(), msgList);

  }

  public void savePrivateMessage(PrivateChatMessageReq request) {

    PrivateChatRoom chatRoom = findPrivateChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = request.getTime();

    PrivateChatMessage chatMessage = PrivateChatMessageDto.toEntity(chatRoom, user, content, time);
    privateChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

  }

  public void saveTeamMessage(TeamChatMessageReq request) {

    TeamChatRoom chatRoom = findTeamChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = request.getTime();

    TeamChatMessage chatMessage = TeamChatMessageDto.toEntity(chatRoom, user, content, time);
    teamChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

  }

  public void saveProjectMessage(ProjectChatMessageReq request) {

    ProjectChatRoom chatRoom = findProjectChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = request.getTime();

    ProjectChatMessage chatMessage = ProjectChatMessageDto.toEntity(chatRoom, user, content, time);
    projectChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

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
