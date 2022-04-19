package com.ssafy.proma.model.entity.sprint;

import com.ssafy.proma.model.entity.project.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

import java.sql.Timestamp;
import lombok.NoArgsConstructor;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "Sprint : 스프린트정보", description = "스프린트의 상세 정보를 나타낸다.")
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SPRINT_NO", nullable = false)
    @ApiModelProperty(value = "스프린트 번호")
    private Integer no;

    @Column(length = 45)
    @ApiModelProperty(value = "스프린트 제목")
    private String name;

    @Column
    @ApiModelProperty(value = "스프린트 시작 날짜")
    private Timestamp startDate;

    @Column
    @ApiModelProperty(value = "스프린트 종료 날짜")
    private Timestamp endDate;

    @Column
    @ApiModelProperty(value = "스프린트 시작, 종료 여부")
    private boolean status;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PROJECT_NO", nullable = false)
    @ApiModelProperty(value = "스프린트를 포함하고 있는 프로젝트")
    private Project project;

}
