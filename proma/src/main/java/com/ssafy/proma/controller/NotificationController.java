package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.notification.NotificationDto;
import com.ssafy.proma.service.notification.NotificationService;
import com.ssafy.proma.util.SecurityUtil;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/notification")
public class NotificationController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final NotificationService notificationService;

    @ApiOperation(value = "모든 알림 조회", notes = "해당 회원이 수신한 모든 알림 조회")
    @GetMapping()
    public ResponseEntity getNotificationList(){

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            String userNo = SecurityUtil.getCurrentUserNo();
            resultMap = notificationService.getNotificationList(userNo);

            if(resultMap.get("message").equals("알림 조회 성공")) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error("알림 조회 실패 : {}", e.getMessage());

            resultMap.put("message", "알림 조회 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "알림 확인 체크", notes = "알림의 checked를 true로 변경")
    @PutMapping("/{notificationNo}")
    public ResponseEntity checkNotification(@PathVariable Integer notificationNo){
        log.debug(notificationNo + " 알림 확인");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = notificationService.checkNotification(notificationNo);

            if(resultMap.get("message").equals("알림 확인 성공")) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error("알림 확인 실패 : {}", e.getMessage());

            resultMap.put("message", "알림 확인 실패");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

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
        NotificationDto notification = new NotificationDto();
        notification.setUserNo(userNo);
        notification.setMessage(userNo + "님 알림 왔음");
        messagingTemplate.convertAndSend("/queue/notification/" + userNo, notification);

        log.debug(userNo + " 알림 전송 완료");
    }


    // 임시 채팅 화면
    @GetMapping("/chatting/{roomNo}/{userNo}")
    public String chattingMain(Model model, @PathVariable String roomNo, @PathVariable String userNo) {
        model.addAttribute("roomNo", roomNo);
        model.addAttribute("userNo", userNo);
        return "/test/roomdetail";
    }
}