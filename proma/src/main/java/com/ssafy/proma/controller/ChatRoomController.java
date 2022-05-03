package com.ssafy.proma.controller;

import static com.ssafy.proma.exception.Message.PRIVATE_CHATROOM_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PRIVATE_CHATROOM_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_CHATROOM_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_CHATROOM_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.TEAM_CHATROOM_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.TEAM_CHATROOM_SUCCESS_MESSAGE;

import com.ssafy.proma.service.chat.ChatService;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
  public ResponseEntity<Map<String, Object>> getPrivateChatRoom(@PathVariable String subNo
      ,@PageableDefault(page = 0, size = 10) Pageable pageable) {
    Map<String, Object> result = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      result = chatService.getPrivateChatRoom(subNo, pageable);

      if(result.get("message").equals(PRIVATE_CHATROOM_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      new IllegalStateException(PRIVATE_CHATROOM_ERROR_MESSAGE);

      result.put("message", PRIVATE_CHATROOM_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity<>(result, status);
  }

  @ApiOperation(value = "팀 단위 그룹 채팅 생성 및 조회", notes = "해당 팀 그룹 채팅방 생성 및 조회")
  @GetMapping("/room/team/{teamNo}")
  public ResponseEntity<Map<String, Object>> getTeamChatRoom(@PathVariable Integer teamNo) {
    Map<String, Object> result = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      result = chatService.getTeamChatRoom(teamNo);

      if(result.get("message").equals(TEAM_CHATROOM_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      new IllegalStateException(TEAM_CHATROOM_ERROR_MESSAGE);

      result.put("message", TEAM_CHATROOM_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity<>(result, status);

  }

  @ApiOperation(value = "프로젝트 단위 그룹 채팅 생성 및 조회", notes = "해당 프로젝트 그룹 채팅방 생성 및 조회")
  @GetMapping("/room/project/{projectNo}")
  public ResponseEntity<Map<String, Object>> getProjectChatRoom(@PathVariable String projectNo) {
    Map<String, Object> result = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      result = chatService.getProjectChatRoom(projectNo);

      if(result.get("message").equals(PROJECT_CHATROOM_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      new IllegalStateException(PROJECT_CHATROOM_ERROR_MESSAGE);

      result.put("message", PROJECT_CHATROOM_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity<>(result, status);

  }

}
