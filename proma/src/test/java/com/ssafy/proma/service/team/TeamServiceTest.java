package com.ssafy.proma.service.team;

import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.proma.model.Dto.Team.TeamDto;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.repository.team.UserTeamRepository;
import com.ssafy.proma.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TeamServiceTest {

  @Autowired
  private TeamService teamService;
  @Autowired
  private TeamRepository teamRepository;
  @Autowired
  private UserTeamRepository userTeamRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private ProjectRepository projectRepository;

  @Test
  void createTeam() {

    //given
    User user = User.builder().no("1").nickname("jdb").profileImage("asfsadfsdf").isDeleted(false).build();
    Project project = Project.builder().no("1").name("happy").description("asdfsadfwefs").isDeleted(false).build();
    TeamDto teamDto = new TeamDto("FE","jdb","1");
    userRepository.save(user);
    projectRepository.save(project);


    //when

    teamService.createTeam(teamDto);

    //then
//    teamRepository.getTeamByNo("1");
//    UserTeamRepository

  }

  @Test
  void joinTeam() {

    //given
    User user = User.builder().no("2").nickname("kih").profileImage("asfsadfsdf").isDeleted(false).build();
//    Project project = Project.builder().no("1").name("happy").description("asdfsadfwefs").isDeleted(false).build();
    TeamDto teamDto = new TeamDto("FE","kih","1");
    userRepository.save(user);
    //when

    teamService.joinTeam(teamDto);

  }
}