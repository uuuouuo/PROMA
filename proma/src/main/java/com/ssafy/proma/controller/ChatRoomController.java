package com.ssafy.proma.controller;


import com.ssafy.proma.model.dto.chat.GroupChatRoomDto.GroupChatRoomRes;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomReq;
import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomRes;
import com.ssafy.proma.service.chat.ChatService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRoomController {

  private final ChatService chatService;

  @ApiOperation(value = "1:1 채팅 생성 및 조회", notes = "해당 유저와 개인 채팅방 생성 및 조회")
  @GetMapping("/room/user")
  public ResponseEntity<PrivateChatRoomRes> getPrivateChatRoom(@RequestBody PrivateChatRoomReq request) {
    PrivateChatRoomRes response = chatService.getPrivateChatRoom(request);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @ApiOperation(value = "그룹 채팅 생성 및 조회", notes = "해당 팀과 그룹 채팅방 생성 및 조회")
  @GetMapping("/room/group/{teamNo}")
  public ResponseEntity<GroupChatRoomRes> getGroupChatRoom(@PathVariable("teamNo") Integer teamNo) {
    GroupChatRoomRes response = chatService.getGroupChatRoom(teamNo);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

}
