package com.ssafy.proma.controller;

import com.ssafy.proma.model.Dto.Team.TeamDto;
import com.ssafy.proma.service.team.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class teamController {

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


  //팀에 속한 백로그 조회

  //팀에 속한 진행중인 이슈 조회

  //팀에 속한 todo

  //팀에 속한 in progress

  //팀에 속한 done

  //팀 나가기

  //팀 삭제
}
