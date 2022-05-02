package com.ssafy.proma.controller;


import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamCreateDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamExitDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamJoinDto;
import com.ssafy.proma.model.dto.team.ReqTeamDto.TeamUpdateDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamDto;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.service.team.TeamService;
import io.swagger.annotations.ApiOperation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class TeamController {

  private final TeamService teamService;
  private final TeamRepository teamRepository;

  @ApiOperation(value = "팀 생성", notes = "팀을 생성한다.")
  @PostMapping
  public ResponseEntity createTeam(@RequestBody TeamCreateDto teamDto){

    teamService.createTeam(teamDto);
    return ResponseEntity.ok().build();

  }

  @ApiOperation(value = "팀 참여", notes = "유저가 팀에 참여한다.")
  @PostMapping("/join")
  public ResponseEntity joinTeam(@RequestBody TeamJoinDto teamDto){

    teamService.joinTeam(teamDto);
    return ResponseEntity.ok().build();
  }

  @ApiOperation(value = "팀 나가기", notes = "유저가 팀을 나갈 수 있다.")
  @PostMapping("/exit")
  public ResponseEntity exitTeam(@RequestBody TeamExitDto teamDto){

    teamService.exitTeam(teamDto);
    return ResponseEntity.ok().build();
  }

  @ApiOperation(value = "팀 삭제", notes = "팀을 삭제한다.")
  @DeleteMapping("/{teamNo}")
  public ResponseEntity deleteTeam(@PathVariable Integer teamNo){

    teamService.deleteTeam(teamNo);
    return ResponseEntity.ok().build();
  }

  @ApiOperation(value = "팀 수정", notes = "팀 이름을 수정한다.")
  @PutMapping
  public ResponseEntity updateTeam(@RequestBody TeamUpdateDto teamUpdateDto){

    teamService.updateTeam(teamUpdateDto);
    return ResponseEntity.ok().build();
  }

  @ApiOperation(value = "모든 팀 조회", notes = "프로젝트에 포함된 모든 팀을 조회한다.")
  @GetMapping("/{projectNo}")
  public ResponseEntity<List<TeamDto>> getTeamList(@PathVariable String projectNo){

    List<TeamDto> teamDtoList = teamService.getTeamList(projectNo);
    return new ResponseEntity<>(teamDtoList, HttpStatus.OK);
  }

  @ApiOperation(value = "팀원 조회", notes = "팀에 속해있는 모든 유저를 조회한다.")
  @GetMapping("/user/{teamNo}")
  public ResponseEntity<List<String>> getUserTeamList(@PathVariable Integer teamNo){

    List<String> userTeamList = teamService.getUserTeamList(teamNo);
    return new ResponseEntity<>(userTeamList, HttpStatus.OK);
  }

  @ApiOperation(value = "단일 팀 정보 조회", notes = "팀 정보 조회")
  @GetMapping("/info/{teamNo}")
  public ResponseEntity<List<String>> getTeam(@PathVariable Integer teamNo){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = teamService.getTeam(teamNo);

      if(resultMap.get("message").equals("팀 조회 성공")) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      log.error("팀 조회 실패 : {}", e.getMessage());

      resultMap.put("message", "팀 조회 실패");
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);
  }
}
