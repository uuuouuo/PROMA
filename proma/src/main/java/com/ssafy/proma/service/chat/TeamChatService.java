package com.ssafy.proma.service.chat;

import static com.ssafy.proma.exception.Message.TEAM_CHATROOM_SUCCESS_MESSAGE;

import com.ssafy.proma.model.dto.chat.ChatMessageDto;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageListRes;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageReq;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageRes;
import com.ssafy.proma.model.dto.chat.TeamChatRoomDto;
import com.ssafy.proma.model.dto.chat.TeamChatRoomDto.TeamChatRoomRes;
import com.ssafy.proma.model.entity.chat.TeamChatMessage;
import com.ssafy.proma.model.entity.chat.TeamChatRoom;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.team.UserTeam;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.chat.TeamChatMessageRepository;
import com.ssafy.proma.repository.chat.TeamChatRoomRepository;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.repository.team.UserTeamRepository;
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
public class TeamChatService {

  private final UserRepository userRepository;
  private final TeamRepository teamRepository;
  private final TeamChatRoomRepository teamChatRoomRepository;
  private final TeamChatMessageRepository teamChatMessageRepository;
  private final UserTeamRepository userTeamRepository;

  public Map<String, Object> getTeamChatRoom(Integer teamNo, Integer lastMsgNo) {

    // team check
    Team team = findTeam(teamNo);

    // chatroom check
    TeamChatRoom chatRoom = teamChatRoomRepository.findByTeam(team)
            .orElseGet(() -> creatTeamChatRoom(team));

    // chatroom 인원수
    List<UserTeam> teamMember = findTeamMember(team);
    int memberCount = teamMember.size();

    // 해당 chatroom 의 messageList 가져오기
    if(lastMsgNo == null) lastMsgNo = Integer.MAX_VALUE;
    List<TeamChatMessage> msgList = new ArrayList<>();
    msgList = teamChatMessageRepository.findByChatRoomAndNoLessThanOrderByTimeDesc(chatRoom, lastMsgNo, PageRequest.of(0,15)).getContent();

    List<ChatMessageListRes> msgResList = new ArrayList<>();
    if(msgList.size() != 0) {
      msgList.forEach(m -> {
        ChatMessageListRes chatMsgListRes = new ChatMessageListRes(m.getNo(), m.getUser().getNo(),
                m.getUser().getNickname(), m.getUser().getProfileImage(), m.getContent(), m.getTime());
        msgResList.add(chatMsgListRes);
      });
    }

    TeamChatRoomRes response = new TeamChatRoomRes(chatRoom.getNo(), memberCount, msgResList);

    Map<String, Object> result = new HashMap<>();
    result.put("response", response);
    result.put("message", TEAM_CHATROOM_SUCCESS_MESSAGE);

    return result;

  }

  public ChatMessageRes saveTeamMessage(ChatMessageReq request) {

    TeamChatRoom chatRoom = findTeamChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = LocalDateTime.now();

    ChatMessageRes response = new ChatMessageRes(chatRoom.getNo(), user.getNo(),
            user.getNickname(), user.getProfileImage(), content, time);

    TeamChatMessage chatMessage = ChatMessageDto.toTeamMsgEntity(chatRoom, user, content, time);
    teamChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

    return response;

  }

  private TeamChatRoom creatTeamChatRoom(Team team) {
    TeamChatRoom chatRoom = TeamChatRoomDto.toEntity(team);
    teamChatRoomRepository.save(chatRoom);

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

  public TeamChatRoom findTeamChatRoom(Integer roomNo) {
    return teamChatRoomRepository.findByNo(roomNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않는 그룹 채팅방입니다."));
  }

  private List<UserTeam> findTeamMember(Team team) {
    return userTeamRepository.findByTeam(team)
        .orElseThrow(() -> new IllegalStateException("멤버가 존재하지 않습니다."));
  }


}