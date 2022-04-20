package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.chat.GroupChatMessageDto.GroupChatMessageReq;
import com.ssafy.proma.model.dto.chat.PrivateChatMessageDto.PrivateChatMessageReq;
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
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomNo(), message);
    }

    @ApiOperation(value = "1:1 채팅 메세지 전송", notes = "해당 개인 채팅방으로 메세지 전송")
    @MessageMapping("/chat/group-msg")
    public void groupMessage(@RequestBody GroupChatMessageReq message) {
        chatService.saveGroupMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomNo(), message);
    }

}
