package com.ssafy.proma.controller;


import com.ssafy.proma.model.dto.chat.PrivateChatRoomDto.PrivateChatRoomRes;
import com.ssafy.proma.model.dto.chat.ProjectChatRoomDto.ProjectChatRoomRes;
import com.ssafy.proma.model.dto.chat.TeamChatRoomDto.TeamChatRoomRes;
import com.ssafy.proma.service.chat.ChatService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRoomController {

  private final ChatService chatService;

  @ApiOperation(value = "개인 채팅 생성 및 조회", notes = "해당 유저와 개인 채팅방 생성 및 조회")
  @GetMapping("/room/user/{subNo}")
  public ResponseEntity<PrivateChatRoomRes> getPrivateChatRoom(@PathVariable String subNo) {
    PrivateChatRoomRes response = chatService.getPrivateChatRoom(subNo);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @ApiOperation(value = "팀 단위 그룹 채팅 생성 및 조회", notes = "해당 팀 그룹 채팅방 생성 및 조회")
  @GetMapping("/room/team/{teamNo}")
  public ResponseEntity<TeamChatRoomRes> getTeamChatRoom(@PathVariable Integer teamNo) {
    TeamChatRoomRes response = chatService.getTeamChatRoom(teamNo);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @ApiOperation(value = "프로젝트 단위 그룹 채팅 생성 및 조회", notes = "해당 프로젝트 그룹 채팅방 생성 및 조회")
  @GetMapping("/room/project/{projectNo}")
  public ResponseEntity<ProjectChatRoomRes> getProjectChatRoom(@PathVariable String projectNo) {
    ProjectChatRoomRes response = chatService.getProjectChatRoom(projectNo);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

}
