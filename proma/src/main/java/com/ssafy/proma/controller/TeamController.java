package com.ssafy.proma.controller;


import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamCreateDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamExitDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamJoinDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamUpdateDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamDto;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.service.team.TeamService;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

  private static TeamService teamService;
  private static TeamRepository teamRepository;

  // 팀생성
  @ApiOperation(value = "팀 생성", notes = "팀을 생성한다.")
  @PostMapping
  public ResponseEntity createTeam(@RequestBody TeamCreateDto teamDto){

    teamService.createTeam(teamDto);

    return ResponseEntity.ok().build();

  }


  //팀 조인
  @ApiOperation(value = "팀 참여", notes = "유저가 팀에 참여한다.")
  @PostMapping("/join")
  public ResponseEntity joinTeam(@RequestBody TeamJoinDto teamDto){

    teamService.joinTeam(teamDto);

    return ResponseEntity.ok().build();
  }


  //팀 나가기
  @ApiOperation(value = "팀 나가기", notes = "유저가 팀을 나갈 수 있다.")
  @PostMapping("/exit")
  public ResponseEntity exitTeam(@RequestBody TeamExitDto teamDto){

    teamService.exitTeam(teamDto);

    return ResponseEntity.ok().build();
  }


  //팀 삭제
  @ApiOperation(value = "팀 삭제", notes = "팀을 삭제한다.")
  @DeleteMapping("/{teamNo}")
  public ResponseEntity deleteTeam(@PathVariable Integer teamNo){

    teamService.deleteTeam(teamNo);

    return ResponseEntity.ok().build();
  }

  //팀 수정
  @ApiOperation(value = "팀 수정", notes = "팀 이름을 수정한다.")
  @PutMapping("/{teamNo}")
  public ResponseEntity updateTeam(@PathVariable Integer teamNo, @RequestBody TeamUpdateDto teamUpdateDto){

    teamService.updateTeam(teamNo, teamUpdateDto);

    return ResponseEntity.ok().build();
  }

  // 프로젝트에 포함된 모든 팀 조회
  @ApiOperation(value = "모든 팀 조회", notes = "프로젝트에 포함된 모든 팀을 조회한다.")
  @GetMapping("/{projectNo}")
  public ResponseEntity<List<TeamDto>> getTeamList(@PathVariable String projectNo){

    List<TeamDto> teamDtoList = teamService.getTeamList(projectNo);

    return new ResponseEntity<>(teamDtoList, HttpStatus.OK);
  }

  // 팀에 속해있는 유저 조회
  @ApiOperation(value = "팀원 조회", notes = "팀에 속해있는 모든 유저를 조회한다.")
  @GetMapping("/{teamNo}")
  public ResponseEntity<List<String>> getUserTeamList(@PathVariable Integer teamNo){

    List<String> userTeamList = teamService.getUserTeamList(teamNo);

    return new ResponseEntity<>(userTeamList, HttpStatus.OK);
  }




  //팀에 속한 백로그 조회

  //팀에 속한 진행중인 이슈 조회

  //팀에 속한 todo

  //팀에 속한 in progress

  //팀에 속한 done

}
