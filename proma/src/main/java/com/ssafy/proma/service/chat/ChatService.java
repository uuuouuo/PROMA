package com.ssafy.proma.service.chat;

import com.ssafy.proma.model.dto.chat.GroupChatMessageDto;
import com.ssafy.proma.model.dto.chat.GroupChatMessageDto.GroupChatMessageReq;
import com.ssafy.proma.model.dto.chat.GroupChatMessageDto.GroupChatMessageRes;
import com.ssafy.proma.model.dto.chat.GroupChatRoomDto;
import com.ssafy.proma.model.dto.chat.GroupChatRoomDto.GroupChatRoomRes;
import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto;
import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto.PrivateChatMessageReq;
import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto.PrivateChatMessageRes;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomReq;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomRes;
import com.ssafy.proma.model.entity.chat.GroupChatMessage;
import com.ssafy.proma.model.entity.chat.GroupChatRoom;
import com.ssafy.proma.model.entity.chat.PrivateChatMessage;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.chat.GroupChatMessageRepository;
import com.ssafy.proma.repository.chat.GroupChatRoomRepository;
import com.ssafy.proma.repository.chat.PrivateChatMessageRepository;
import com.ssafy.proma.repository.chat.PrivateChatRoomRepository;
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
  private final PrivateChatRoomRepository privateChatRoomRepository;
  private final PrivateChatMessageRepository privateChatMessageRepository;
  private final GroupChatRoomRepository groupChatRoomRepository;
  private final GroupChatMessageRepository groupChatMessageRepository;

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

  public GroupChatRoomRes getGroupChatRoom(Integer teamNo) {

    // team check
    Team team = findTeam(teamNo);

    // chatroom check
    GroupChatRoom chatRoom = groupChatRoomRepository.findByTeam(team)
        .orElseGet(() -> creatGroupChatRoom(team));

    // 해당 chatroom 의 messageList 가져오기
    List<GroupChatMessageRes> msgList =
        groupChatMessageRepository.findAllByChatRoom(chatRoom)
        .stream().map(GroupChatMessageRes::new)
        .collect(Collectors.toList());

    return new GroupChatRoomRes(chatRoom.getNo(), msgList);

  }

  public void savePrivateMessage(PrivateChatMessageReq request) {
    System.out.println(request.getRoomNo());
    PrivateChatRoom chatRoom = findPrivateChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = request.getTime();

    PrivateChatMessage chatMessage = PrivateChatMessageDto.toEntity(chatRoom, user, content, time);
    privateChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

  }

  public void saveGroupMessage(GroupChatMessageReq request) {

    GroupChatRoom chatRoom = findGroupChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = request.getTime();

    GroupChatMessage chatMessage = GroupChatMessageDto.toEntity(chatRoom, user, content, time);
    groupChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

  }

  public PrivateChatRoom createPrivateChatRoom(User pub, User sub) {
    PrivateChatRoom chatRoom = PrivateChatRoomDto.toEntity(pub, sub);
    privateChatRoomRepository.save(chatRoom);

    return chatRoom;
  }

  private GroupChatRoom creatGroupChatRoom(Team team) {
    GroupChatRoom chatRoom = GroupChatRoomDto.toEntity(team);
    groupChatRoomRepository.save(chatRoom);

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

  public PrivateChatRoom findPrivateChatRoom(Integer roomNo) {
    return privateChatRoomRepository.findByNo(roomNo)
        .orElseThrow(() -> new IllegalStateException("존재하지 않는 개인 채팅방입니다."));
  }

  public GroupChatRoom findGroupChatRoom(Integer roomNo) {
    return groupChatRoomRepository.findByNo(roomNo)
        .orElseThrow(() -> new IllegalStateException("존재하지 않는 그룹 채팅방입니다."));
  }


}
