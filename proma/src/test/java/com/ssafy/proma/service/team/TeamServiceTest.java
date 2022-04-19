package com.ssafy.proma.service.team;

import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamCreateDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamExitDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamJoinDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamUpdateDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamDto;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.repository.team.UserTeamRepository;
import com.ssafy.proma.repository.user.UserRepository;
import java.util.List;
import java.util.Optional;
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

//    given
    User user = User.builder().no("4").nickname("pjh").profileImage("asfsadfsdf").isDeleted(false).build();
//    Project project = Project.builder().no("1").name("happy").description("asdfsadfwefs").isDeleted(false).build();
    TeamCreateDto teamDto = new TeamCreateDto("FE","pjh","1");
    userRepository.save(user);
//    projectRepository.save(project);


    //when

    teamService.createTeam(teamDto);

    //then
//    teamRepository.getTeamByNo("1");
//    UserTeamRepository

  }

  @Test
  void joinTeam() {

    //given
    User user = User.builder().no("3").nickname("jsm").profileImage("asfsadfsdf").isDeleted(false).build();
//    Project project = Project.builder().no("1").name("happy").description("asdfsadfwefs").isDeleted(false).build();
//    Optional<Project> projectByNo = projectRepository.getProjectByNo("1");
//    Project project = projectByNo.get();
    TeamJoinDto teamDto = new TeamJoinDto(1,"jsm");
    userRepository.save(user);
    //when

    teamService.joinTeam(teamDto);

  }
  @Test
  void exitTeam() {

    //given
    TeamExitDto teamDto = new TeamExitDto(1,"kih");
    //when

    teamService.exitTeam(teamDto);

  }

  @Test
  void deleteTeam() {

    //given

    //when

    teamService.deleteTeam(1);


  }

  @Test
  void updateTeam() {

    //given
    TeamUpdateDto teamDto = new TeamUpdateDto("BE");

    //when

    teamService.updateTeam(1,teamDto);


  }

  @Test
  void getTeamList() {

    //given
    //when

    List<TeamDto> teamList = teamService.getTeamList("1");

    System.out.println(teamList.size());

  }

  @Test
  void getUserTeamList() {

    //given
    //when

    List<String> userTeamList = teamService.getUserTeamList(2);

    userTeamList.forEach(nickname -> System.out.println(nickname));
  }

}