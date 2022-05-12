package com.ssafy.proma.repository.issue;

import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.model.entity.user.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue,Integer> {

  void deleteAllByTeam(Team team);
  void deleteAllByTopic(Topic topic);
  Optional<List<Issue>> findByTopic(Topic topic);
  Optional<Issue> findByNo(Integer issueNo);
  Optional<List<Issue>> findBySprintAndTeam(Sprint sprint, Team team);
  Optional<List<Issue>> findByTeamAndSprintNull(Team team);
  Optional<List<Issue>> findByTeamAndStatusLike(Team team, String status);
  Optional<List<Issue>> findByUserAndTeam(User user, Team team);

  Optional<List<Issue>> findByTeamAndSprintAndStatusLike(Team team, Sprint sprint, String status);

  Optional<List<Issue>> findBySprint(Sprint sprint);
}

