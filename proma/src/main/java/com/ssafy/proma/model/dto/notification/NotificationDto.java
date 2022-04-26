package com.ssafy.proma.model.dto.notification;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class NotificationDto {

    private Integer notificationNo;
    private String userNo;
    private String message;
    private boolean checked;
    private LocalDateTime notificationTime;

    public NotificationDto(Integer notificationNo, String message, boolean checked, LocalDateTime notificationTime){
        this.notificationNo = notificationNo;
        this.message = message;
        this.checked = checked;
        this.notificationTime = notificationTime;
    }
}