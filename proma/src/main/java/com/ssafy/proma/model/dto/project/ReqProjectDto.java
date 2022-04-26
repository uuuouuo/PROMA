package com.ssafy.proma.model.dto.project;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.topic.Topic;
import java.util.List;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReqProjectDto {

  @Getter
  @NoArgsConstructor
  public static class ProjectCreateDto{

    String title;
    String introduction;
    List<String> inviteMails;

    public ProjectCreateDto(String title, String introduction,
        List<String> inviteMails) {
      this.title = title;
      this.introduction = introduction;
      this.inviteMails = inviteMails;
    }

    public Project toEntity(String projectNo){
      return Project.builder().no(projectNo).name(title).description(introduction).isDeleted(false).build();
    }
  }

  @Getter
  @NoArgsConstructor
  public static class ProjectJoinDto{

    String projectNo;

    public ProjectJoinDto(String projectNo) {
      this.projectNo = projectNo;
    }
  }

}
