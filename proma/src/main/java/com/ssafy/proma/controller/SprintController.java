package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto;
import com.ssafy.proma.service.sprint.SprintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sprint")
public class SprintController {

  private final SprintService sprintService;

  // 스프린트 생성
  @PostMapping
  public ResponseEntity createSprint(@RequestBody SprintCreateDto sprintCreateDto){

    sprintService.createSprint(sprintCreateDto);

    return ResponseEntity.ok().build();
  }

  // 스프린트 시작

  // 스프린트 수정

  
}
