package com.ssafy.proma.model.dto.notification;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private Integer notificationNo;
    private String message;
    private boolean checked;
    private LocalDateTime notificationTime;
}