package com.ssafy.proma.service.notification;

import com.ssafy.proma.model.dto.notification.NotificationDto;
import com.ssafy.proma.model.entity.notification.Notification;
import com.ssafy.proma.repository.Notification.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final NotificationRepository notificationRepository;

    @Override
    public Map<String, Object> getNotificationList(String userNo) throws Exception {

        Map<String, Object> resultMap = new HashMap<>();
        List<Notification> notifications = notificationRepository.findByUserNoOrderByCheckedAscNotificationTimeDesc(userNo);

        List<NotificationDto>  notificationList = notifications.stream().map(
            notification -> new NotificationDto(notification.getNo(), notification.getMessage(), notification.isChecked(), notification.getNotificationTime())
        ).collect(Collectors.toList());

        resultMap.put("notificationList", notificationList);
        resultMap.put("message", "알림 조회 성공");

        return resultMap;
    }
}