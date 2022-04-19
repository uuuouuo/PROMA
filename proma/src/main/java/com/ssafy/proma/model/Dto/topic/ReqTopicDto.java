package com.ssafy.proma.model.Dto.topic;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.topic.Topic;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReqTopicDto {

  @Getter
  @NoArgsConstructor
  public static class TopicCreateDto{
    String title;
    String description;
    String projectNo;

    public TopicCreateDto(String title, String description, String projectNo) {
      this.title = title;
      this.description = description;
      this.projectNo = projectNo;
    }

    public Topic toEntity(Project project){
      return Topic.builder().title(title).description(description).project(project).build();
    }
  }
  @Getter
  @NoArgsConstructor
  public static class TopicUpdateDto{

    String title;
    String description;

    public TopicUpdateDto(String title, String description) {
      this.title = title;
      this.description = description;
    }
  }




}
