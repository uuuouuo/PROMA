package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.notification.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/notification")
public class NotificationController {

    private final SimpMessageSendingOperations messagingTemplate;

    // 임시 알림 화면
    @GetMapping("/{userNo}")
    public String notificationMain(Model model, @PathVariable String userNo) {
        model.addAttribute("userNo", userNo);
        return "/test/notification";
    }

    // 임시 알림 전송
    @PostMapping("/send")
    @ResponseBody
    public void sendNotification(@RequestParam String userNo) {

        //알림 전송
        Notification notification = new Notification();
        notification.setUserId(userNo);
        notification.setMessage(userNo + "님 알림 왔음");
        messagingTemplate.convertAndSend("/queue/notification/" + userNo, notification);

        log.debug(userNo + " 알림 전송 완료");
    }
}