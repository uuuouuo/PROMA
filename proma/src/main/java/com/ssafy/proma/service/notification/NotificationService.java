package com.ssafy.proma.service.notification;

import com.ssafy.proma.model.entity.sprint.Sprint;

import java.util.Map;

public interface NotificationService {

    Map<String, Object> getNotificationList(String userNo) throws Exception;
    Map<String, Object> checkNotification(Integer notificationNo) throws Exception;
    public void sendSprintNotification(Sprint sprint);
    public Map<String, Object> sendNotification(String userNo) throws Exception;
}
