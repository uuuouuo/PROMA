package com.ssafy.proma.model.dto.team;

import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueNoTitleDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResTeamDto {

  @Getter
  @NoArgsConstructor
  public static class TeamDto{

    Integer teamNo;
    String title;
    Boolean isMember;

    public TeamDto(Integer teamNo, String title, Boolean isMember) {
      this.teamNo = teamNo;
      this.title = title;
      this.isMember = isMember;
    }

  }

  @Getter
  @NoArgsConstructor
  public static class TeamIssueDto{

    Integer teamNo;
    String title;

    public TeamIssueDto(Integer teamNo, String title) {
      this.teamNo = teamNo;
      this.title = title;
    }

  }

  @Getter
  @AllArgsConstructor
  public static class TeamMemberDto {

    String userNo;
    String nickName;
    String profileImage;

  }

  @Getter
  @AllArgsConstructor
  public static class TeamIssueListDto {

    Integer teamNo;
    String title;
    Boolean isMember;
    List<IssueNoTitleDto> issues;

  }
}
