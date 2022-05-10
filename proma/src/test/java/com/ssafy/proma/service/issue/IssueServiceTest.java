package com.ssafy.proma.service.issue;

import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.repository.project.ProjectRepository;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class IssueServiceTest {

  @Autowired
  private IssueService issueService;
  @Autowired
  private ProjectRepository projectRepository;


  @Test
  void getSprintList() throws Exception {

    Map<String, Object> sprintTeamIssue = issueService.getSprintTeamIssue("7L6iOKQW7UH0Bnu", false);

    Object issueList = sprintTeamIssue.get("issueList");
    System.out.println(issueList);
  }
}