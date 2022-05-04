package com.ssafy.proma.model.dto.project;

import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResProjectDto {

  @Getter
  @NoArgsConstructor
  public static class ProjectNoTitleDto{

    String projectNo;
    String title;
    String role;

    public ProjectNoTitleDto(String projectNo, String title, String role) {
      this.projectNo = projectNo;
      this.title = title;
      this.role = role;
    }
  }

  @Getter
  @AllArgsConstructor
  public static class ProjectTeamUserDto{

    String projectNo;
    String title;
    List<TeamMembersDto> teamMembersDtos;
  }

  @Getter
  @AllArgsConstructor
  public static class ProjectDetailDto{
    String title;
  }

  @Getter
  @AllArgsConstructor
  public static class TeamMembersDto {

    Integer teamNo;
    String title;
    List<UserDto> userDtos;

  }
}
