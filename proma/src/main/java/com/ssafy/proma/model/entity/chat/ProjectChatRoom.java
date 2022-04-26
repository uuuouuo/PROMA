package com.ssafy.proma.model.entity.chat;

import static javax.persistence.FetchType.LAZY;

import com.ssafy.proma.model.entity.project.Project;
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
@ApiModel(value = "ProjectChatRoom : 프로젝트 단위 그룹 채팅 방 정보", description = "채팅 방 정보를 나타낸다.")
public class ProjectChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "TEAM_CHAT_ROOM_NO")
  @ApiModelProperty(value = "프로젝트 단위 그룹 채팅 메세지 번호")
  private Integer no;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name="TEAM_NO")
  @ApiModelProperty(value = "프로젝트 번호")
  private Project project;

}

