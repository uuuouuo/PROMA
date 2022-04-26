package com.ssafy.proma.model.entity.chat;

import static javax.persistence.FetchType.LAZY;

import com.ssafy.proma.model.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "PrivateChatMessage : 개인 채팅 메세지 정보", description = "채팅 메세지 정보를 나타낸다.")
public class PrivateChatMessage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "PRIVATE_CHAT_MESSAGE_NO")
  @ApiModelProperty(value = "개인 채팅 메세지 번호")
  private Integer no;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name="PRIVATE_ROOM_NO")
  @ApiModelProperty(value = "개인 채팅방 번호")
  private PrivateChatRoom chatRoom;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name="USER_NO")
  @ApiModelProperty(value = "유저 번호")
  private User user;

  @ApiModelProperty(value = "채팅 내용")
  private String content;

  @ApiModelProperty(value = "전송 시간")
  private LocalDateTime time;

}

