package com.ssafy.proma.model.entity.notification;

import com.ssafy.proma.model.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Notification : 알림", description = "알림의 상세 정보를 나타낸다.")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTIFICATION_NO", nullable = false)
    @ApiModelProperty(value = "알림 번호")
    private Integer no;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_NO", nullable = false)
    @ApiModelProperty(value = "유저 정보")
    private User user;

    @Column(length = 45)
    @ApiModelProperty(value = "알림 내용")
    private String message;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    @ApiModelProperty(value = "알림 확인 여부")
    private boolean checked;

    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    @ApiModelProperty(value = "알림 시간")
    private LocalDateTime notificationTime;
}