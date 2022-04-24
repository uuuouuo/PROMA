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

  Optional<List<Issue>> getAllByTopic(Topic topic);

  Optional<Issue> getByNo(Integer issueNo);

  Optional<List<Issue>> getAllBySprintAndTeam(Sprint sprint, Team team);

  Optional<List<Issue>> getAllByTeamAndSprintNull(Team team);

  Optional<List<Issue>> getAllByTeamAndStatusLike(Team team, String status);

  Optional<List<Issue>> getAllByUserAndTeam(User user, Team team);
}
