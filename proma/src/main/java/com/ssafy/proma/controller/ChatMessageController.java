package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageReq;
import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageRes;
import com.ssafy.proma.service.chat.PrivateChatService;
import com.ssafy.proma.service.chat.ProjectChatService;
import com.ssafy.proma.service.chat.TeamChatService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final PrivateChatService privateChatService;
    private final TeamChatService teamChatService;
    private final ProjectChatService projectChatService;

    @ApiOperation(value = "개인 채팅 메세지 전송", notes = "해당 개인 채팅방으로 메세지 전송")
    @MessageMapping("/chat/private-msg")
    public void privateMessage(@RequestBody ChatMessageReq message) {
        ChatMessageRes response = privateChatService.savePrivateMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/user/" + response.getRoomNo(), response);
    }

    @ApiOperation(value = "팀 단위 그룹 채팅 메세지 전송", notes = "해당 팀 채팅방으로 메세지 전송")
    @MessageMapping("/chat/team-msg")
    public void teamMessage(@RequestBody ChatMessageReq message) {
        ChatMessageRes response = teamChatService.saveTeamMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/team/" + response.getRoomNo(), response);
    }

    @ApiOperation(value = "프로젝트 단위 그룹 채팅 메세지 전송", notes = "해당 프로젝트 채팅방으로 메세지 전송")
    @MessageMapping("/chat/project-msg")
    public void projectMessage(@RequestBody ChatMessageReq message) {
        ChatMessageRes response = projectChatService.saveProjectMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/project/" + response.getRoomNo(), response);
    }

}
