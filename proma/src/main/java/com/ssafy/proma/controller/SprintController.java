package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto;
import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto.SprintUpdateDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintNoTitle;
import com.ssafy.proma.service.sprint.SprintService;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sprint")
public class SprintController {

  private final SprintService sprintService;

  @ApiOperation(value = "스프린트 생성", notes = "스프린트를 생성한다.")
  @PostMapping
  public ResponseEntity createSprint(@RequestBody SprintCreateDto sprintCreateDto){
    sprintService.createSprint(sprintCreateDto);
    return ResponseEntity.ok().build();
  }

  @ApiOperation(value = "스프린트 시작/종료", notes = "스프린트를 시작/종료한다.")
  @PutMapping("/status/{sprintNo}")
  public ResponseEntity startSprint(@PathVariable Integer sprintNo){
    sprintService.startSprint(sprintNo);
    return ResponseEntity.ok().build();
  }

  @ApiOperation(value = "스프린트 수정", notes = "스프린트를 수정한다.")
  @PutMapping("/{sprintNo}")
  public ResponseEntity updateSprint(@PathVariable Integer sprintNo, @RequestBody SprintUpdateDto sprintUpdateDto){
    sprintService.updateSprint(sprintNo,sprintUpdateDto);
    return ResponseEntity.ok().build();
  }

  @ApiOperation(value = "모든 스프린트 조회", notes = "프로젝트에 포함된 모든 스프린트 조회")
  @GetMapping("/list/{projectNo}")
  public ResponseEntity<List<SprintDto>> getSprintList(@PathVariable String projectNo){
    List<SprintDto> sprintList = sprintService.getSprintList(projectNo);
    return new ResponseEntity<>(sprintList, HttpStatus.OK);
  }

  @ApiOperation(value = "진행중인 스프린트 조회", notes = "진행중인 스프린트 조회")
  @GetMapping("/start/{projectNo}")
  public ResponseEntity<SprintNoTitle> getDoingSprint(@PathVariable String projectNo){
    SprintNoTitle doingSprint = sprintService.getDoingSprint(projectNo);
    return new ResponseEntity<>(doingSprint, HttpStatus.OK);
  }

}
