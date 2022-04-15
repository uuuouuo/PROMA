package com.ssafy.proma.model.entity.project;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Builder
@AllArgsConstructor
@ApiModel(value = "Project : 프로젝트정보", description = "프로젝트의 상세 정보를 나타낸다.")
public class Project {

    @Id
    @Column(name = "PROJECT_NO", nullable = false, length = 15)
    @ApiModelProperty(value = "프로젝트 번호")
    private String no;

    @Column(length = 20)
    @ApiModelProperty(value = "프로젝트 제목")
    private String name;

    @Column(length = 100)
    @ApiModelProperty(value = "프로젝트 설명")
    private String description;

    @Column
    @ApiModelProperty(value = "프로젝트 삭제 여부")
    private boolean isDeleted;

    protected Project(){

    }
}
