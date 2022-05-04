package com.ssafy.proma.repository.team;

import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.team.UserTeam;
import com.ssafy.proma.model.entity.user.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTeamRepository extends JpaRepository<UserTeam,Integer> {

  void deleteByUserAndTeam(User user, Team team);
  void deleteAllByTeam(Team team);
  Optional<List<UserTeam>> findByTeam(Team team);

  Optional<UserTeam> findByUserAndTeam(User user, Team team);
}
