package com.ssafy.proma.service.notification;

import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.sprint.Sprint;

import java.util.Map;

public interface NotificationService {

    Map<String, Object> getNotificationList(String userNo) throws Exception;
    Map<String, Object> checkNotification(Integer notificationNo) throws Exception;
    void sendSprintNotification(Sprint sprint) throws Exception;
    void sendTopicNotification(Issue issue) throws Exception;
    Map<String, Object> sendNotification(String userNo) throws Exception;
}
