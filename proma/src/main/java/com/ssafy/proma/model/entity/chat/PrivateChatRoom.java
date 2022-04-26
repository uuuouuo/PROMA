package com.ssafy.proma.model.entity.chat;

import static javax.persistence.FetchType.LAZY;

import com.ssafy.proma.model.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(value = "PrivateChatRoom : 개인 채팅룸 정보", description = "개인 채팅룸 정보를 나타낸다.")
public class PrivateChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "PRIVATE_CHAT_ROOM_NO")
  @ApiModelProperty(value = "개인 채팅방 번호")
  private Integer no;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name="PUBLISHER_NO")
  @ApiModelProperty(value = "보내는 사람")
  private User publisher;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name="SUBSCRIBER_NO")
  @ApiModelProperty(value = "받는 사람")
  private User subscriber;

}

