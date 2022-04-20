package com.ssafy.proma.repository.Notification;

import com.ssafy.proma.model.entity.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findByUserNoOrderByCheckedAscNotificationTimeDesc(String userNo);
}
