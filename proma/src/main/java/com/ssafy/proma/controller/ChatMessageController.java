package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto.PrivateChatMessageReq;
import com.ssafy.proma.model.dto.chat.ProjectChatMessageDto.ProjectChatMessageReq;
import com.ssafy.proma.model.dto.chat.TeamChatMessageDto.TeamChatMessageReq;
import com.ssafy.proma.service.chat.ChatService;
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
    private final ChatService chatService;

    @ApiOperation(value = "1:1 채팅 메세지 전송", notes = "해당 개인 채팅방으로 메세지 전송")
    @MessageMapping("/chat/private-msg")
    public void privateMessage(@RequestBody PrivateChatMessageReq message) {
        chatService.savePrivateMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/user" + message.getRoomNo(), message);
    }

    @ApiOperation(value = "팀 단위 그룹 채팅 메세지 전송", notes = "해당 팀 채팅방으로 메세지 전송")
    @MessageMapping("/chat/team-msg")
    public void teamMessage(@RequestBody TeamChatMessageReq message) {
        chatService.saveTeamMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/team" + message.getRoomNo(), message);
    }

    @ApiOperation(value = "프로젝트 단위 그룹 채팅 메세지 전송", notes = "해당 프로젝트 채팅방으로 메세지 전송")
    @MessageMapping("/chat/project-msg")
    public void projectMessage(@RequestBody ProjectChatMessageReq message) {
        chatService.saveProjectMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/project" + message.getRoomNo(), message);
    }

}
