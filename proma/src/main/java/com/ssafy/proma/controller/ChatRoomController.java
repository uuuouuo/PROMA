package com.ssafy.proma.controller;

import static com.ssafy.proma.exception.Message.PRIVATE_CHATROOM_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PRIVATE_CHATROOM_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_CHATROOM_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_CHATROOM_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.TEAM_CHATROOM_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.TEAM_CHATROOM_SUCCESS_MESSAGE;

import com.ssafy.proma.service.chat.PrivateChatService;
import com.ssafy.proma.service.chat.ProjectChatService;
import com.ssafy.proma.service.chat.TeamChatService;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRoomController {

  private final PrivateChatService privateChatService;
  private final TeamChatService teamChatService;
  private final ProjectChatService projectChatService;

  @ApiOperation(value = "개인 채팅 생성 및 조회", notes = "해당 유저와 개인 채팅방 생성 및 조회")
  @GetMapping("/room/user/{subNo}")
  public ResponseEntity<Map<String, Object>> getPrivateChatRoom(@PathVariable String subNo, @RequestParam(required = false) Integer lastMsgNo) {
    Map<String, Object> result = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      result = privateChatService.getPrivateChatRoom(subNo, lastMsgNo);

      if(result.get("message").equals(PRIVATE_CHATROOM_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      log.error("개인 채팅 생성 및 조회 실패 : {}", e.getMessage());

      result.put("message", PRIVATE_CHATROOM_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity<>(result, status);
  }

  @ApiOperation(value = "팀 단위 그룹 채팅 생성 및 조회", notes = "해당 팀 그룹 채팅방 생성 및 조회")
  @GetMapping("/room/team/{teamNo}")
  public ResponseEntity<Map<String, Object>> getTeamChatRoom(@PathVariable Integer teamNo, @RequestParam(required = false) Integer lastMsgNo) {
    Map<String, Object> result = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      result = teamChatService.getTeamChatRoom(teamNo, lastMsgNo);

      if(result.get("message").equals(TEAM_CHATROOM_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      log.error("팀 채팅 생성 및 조회 실패 : {}", e.getMessage());

      result.put("message", TEAM_CHATROOM_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity<>(result, status);

  }

  @ApiOperation(value = "프로젝트 단위 그룹 채팅 생성 및 조회", notes = "해당 프로젝트 그룹 채팅방 생성 및 조회")
  @GetMapping("/room/project/{projectNo}")
  public ResponseEntity<Map<String, Object>> getProjectChatRoom(@PathVariable String projectNo, @RequestParam(required = false) Integer lastMsgNo) {
    Map<String, Object> result = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      result = projectChatService.getProjectChatRoom(projectNo, lastMsgNo);

      if(result.get("message").equals(PROJECT_CHATROOM_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      log.error("프로젝트 채팅 생성 및 조회 실패 : {}", e.getMessage());

      result.put("message", PROJECT_CHATROOM_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity<>(result, status);

  }

}