package com.ssafy.proma.controller;

import static com.ssafy.proma.exception.Message.SPRINT_CREATE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_CREATE_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_DELETE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_DELETE_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_GET_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_GET_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_UPDATE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_UPDATE_SUCCESS_MESSAGE;

import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto;
import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto.SprintUpdateDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintNoTitle;
import com.ssafy.proma.service.sprint.SprintService;
import io.swagger.annotations.ApiOperation;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
@RequiredArgsConstructor
@RequestMapping("/sprint")
public class SprintController {

  private final SprintService sprintService;

  @ApiOperation(value = "스프린트 생성", notes = "스프린트를 생성한다.")
  @PostMapping
  public ResponseEntity createSprint(@RequestBody SprintCreateDto sprintCreateDto){
    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = sprintService.createSprint(sprintCreateDto);

      if(resultMap.get("message").equals(SPRINT_CREATE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {

      resultMap.put("message", SPRINT_CREATE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);

//    sprintService.createSprint(sprintCreateDto);
  }

  @ApiOperation(value = "스프린트 시작/종료", notes = "스프린트를 시작/종료한다.")
  @PutMapping("/status/{sprintNo}")
  public ResponseEntity startSprint(@PathVariable Integer sprintNo){
    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = sprintService.startSprint(sprintNo);

      if(resultMap.get("message").equals(SPRINT_GET_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {

      resultMap.put("message", SPRINT_GET_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);
//    sprintService.startSprint(sprintNo);
  }

  @ApiOperation(value = "스프린트 수정", notes = "스프린트를 수정한다.")
  @PutMapping("/{sprintNo}")
  public ResponseEntity updateSprint(@PathVariable Integer sprintNo, @RequestBody SprintUpdateDto sprintUpdateDto){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = sprintService.updateSprint(sprintNo,sprintUpdateDto);

      if(resultMap.get("message").equals(SPRINT_UPDATE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {

      resultMap.put("message", SPRINT_UPDATE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "모든 스프린트 조회", notes = "프로젝트에 포함된 모든 스프린트 조회")
  @GetMapping("/list/{projectNo}")
  public ResponseEntity getSprintList(@PathVariable String projectNo){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = sprintService.getSprintList(projectNo);

      if(resultMap.get("message").equals(SPRINT_GET_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {

      resultMap.put("message", SPRINT_GET_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);

  }

  @ApiOperation(value = "진행중인 스프린트 조회", notes = "진행중인 스프린트 조회")
  @GetMapping("/start/{projectNo}")
  public ResponseEntity getDoingSprint(@PathVariable String projectNo){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = sprintService.getDoingSprint(projectNo);

      if(resultMap.get("message").equals(SPRINT_GET_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {

      resultMap.put("message", SPRINT_GET_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "스프린트 삭제", notes = "스프린트 삭제")
  @DeleteMapping("/{sprintNo}")
  public ResponseEntity deleteSprint(@PathVariable Integer sprintNo){
    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap = sprintService.getDeleteSprint(sprintNo);

      if(resultMap.get("message").equals(SPRINT_DELETE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      resultMap.put("message",SPRINT_DELETE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity<>(resultMap,status);
  }

}
