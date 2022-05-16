package com.ssafy.proma.service.chat;

import static com.ssafy.proma.exception.Message.TEAM_CHATROOM_SUCCESS_MESSAGE;

import com.ssafy.proma.model.dto.chat.ChatMessageDto;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageListRes;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageReq;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageRes;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomRes;
import com.ssafy.proma.model.entity.chat.PrivateChatMessage;
import com.ssafy.proma.model.entity.chat.PrivateChatRoom;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.chat.PrivateChatMessageRepository;
import com.ssafy.proma.repository.chat.PrivateChatRoomRepository;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.util.SecurityUtil;
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
public class PrivateChatService {

  private final UserRepository userRepository;
  private final PrivateChatRoomRepository privateChatRoomRepository;
  private final PrivateChatMessageRepository privateChatMessageRepository;

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

  public ChatMessageRes savePrivateMessage(ChatMessageReq request) {

    PrivateChatRoom chatRoom = findPrivateChatRoom(request.getRoomNo());
    User user = findUser(request.getPubNo());
    String content = request.getContent();
    LocalDateTime time = LocalDateTime.now();

    ChatMessageRes response = new ChatMessageRes(chatRoom.getNo(), user.getNo(),
            user.getNickname(), user.getProfileImage(), content, time);

    PrivateChatMessage chatMessage = ChatMessageDto.toPrivateMsgEntity(chatRoom, user, content, time);
    privateChatMessageRepository.save(chatMessage);

    System.out.println("채팅저장완료.");

    return response;

  }

  public PrivateChatRoom createPrivateChatRoom(User pub, User sub) {
    PrivateChatRoom chatRoom = PrivateChatRoomDto.toEntity(pub, sub);
    privateChatRoomRepository.save(chatRoom);

    return chatRoom;
  }

  public User findUser(String userNo) {
    return userRepository.findByNo(userNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않은 회원입니다."));
  }

  public PrivateChatRoom findPrivateChatRoom(Integer roomNo) {
    return privateChatRoomRepository.findByNo(roomNo)
            .orElseThrow(() -> new IllegalStateException("존재하지 않는 개인 채팅방입니다."));
  }


}