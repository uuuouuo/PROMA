package com.ssafy.proma.controller;

import com.ssafy.proma.model.Dto.Team.TeamDto;
import com.ssafy.proma.model.Dto.Team.TeamDto.TeamUpdateDto;
import com.ssafy.proma.service.team.TeamService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

  // 팀생성
  @PostMapping
  public ResponseEntity createTeam(@RequestBody TeamDto teamDto){

    teamService.createTeam(teamDto);

    return ResponseEntity.ok().build();

  }


  //팀 조인
  @PostMapping("/join")
  public ResponseEntity joinTeam(@RequestBody TeamDto teamDto){

    teamService.joinTeam(teamDto);

    return ResponseEntity.ok().build();
  }


  //팀 나가기
  @PostMapping("/exit")
  public ResponseEntity exitTeam(@RequestBody TeamDto teamDto){

    teamService.exitTeam(teamDto);

    return ResponseEntity.ok().build();
  }


  //팀 삭제
  @PostMapping("/delete")
  public ResponseEntity deleteTeam(@RequestBody TeamDto teamDto){

    teamService.deleteTeam(teamDto);

    return ResponseEntity.ok().build();
  }

  //팀 삭제
  @PutMapping
  public ResponseEntity updateTeam(@RequestBody TeamUpdateDto teamUpdateDto){

    teamService.updateTeam(teamUpdateDto);

    return ResponseEntity.ok().build();
  }


  //팀에 속한 백로그 조회

  //팀에 속한 진행중인 이슈 조회

  //팀에 속한 todo

  //팀에 속한 in progress

  //팀에 속한 done

}
