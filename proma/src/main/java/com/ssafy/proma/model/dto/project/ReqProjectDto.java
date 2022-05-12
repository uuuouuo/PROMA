package com.ssafy.proma.model.dto.project;

import com.ssafy.proma.model.entity.project.Project;
import java.util.List;
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

  }

  @Getter
  @NoArgsConstructor
  public static class ProjectUpdateDto{

    String projectNo;
    String title;
  }

}
