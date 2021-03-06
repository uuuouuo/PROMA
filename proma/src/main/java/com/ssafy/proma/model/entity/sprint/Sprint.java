package com.ssafy.proma.model.entity.sprint;

import static javax.persistence.FetchType.LAZY;

import com.ssafy.proma.model.entity.project.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    @Column(length = 50)
    @ApiModelProperty(value = "스프린트 제목")
    private String name;

    @Column
    @ApiModelProperty(value = "스프린트 시작 날짜")
    private LocalDate startDate;

    @Column
    @ApiModelProperty(value = "스프린트 종료 날짜")
    private LocalDate endDate;

    @Column
    @ApiModelProperty(value = "0:예정 1 :진행 2:종료")
    private Integer status;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PROJECT_NO", nullable = false)
    @ApiModelProperty(value = "스프린트를 포함하고 있는 프로젝트")
    private Project project;

    public void toggleStatus(){
        this.status++;
    }

    public void update(String name,String startDate,String endDate){

        DateTimeFormatter DATEFORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDateTime = LocalDate.parse(startDate, DATEFORMATTER);
        LocalDate endDateTime = LocalDate.parse(endDate, DATEFORMATTER);

        this.name = name;
        this.startDate = startDateTime;
        this.endDate = endDateTime;
    }

}
