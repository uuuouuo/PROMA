package com.ssafy.proma.repository.issue;

import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.team.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue,Integer> {

  void deleteAllByTeam(Team team);

}
