package com.ssafy.proma.service.notification;

import java.util.Map;

public interface NotificationService {

    Map<String, Object> getNotificationList(String userNo) throws Exception;
    Map<String, Object> checkNotification(Integer notificationNo) throws Exception;
}
