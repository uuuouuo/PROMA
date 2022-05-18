package com.ssafy.proma.model.entity.topic;

import com.ssafy.proma.model.entity.project.Project;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import lombok.NoArgsConstructor;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel(value = "Topic : 토픽정보", description = "토픽의 상세 정보를 나타낸다.")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TOPIC_NO", nullable = false)
    @ApiModelProperty(value = "토픽 번호")
    private Integer no;

    @Column(length = 50)
    @ApiModelProperty(value = "토픽 제목")
    private String title;

    @Column(length = 100)
    @ApiModelProperty(value = "토픽 설명")
    private String description;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PROJECT_NO", nullable = false)
    @ApiModelProperty(value = "토픽을 포함하고 있는 프로젝트")
    private Project project;

    public void update(String title,String description){
        this.title = title;
        this.description = description;
    }

}
