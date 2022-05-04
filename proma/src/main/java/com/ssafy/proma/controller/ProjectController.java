package com.ssafy.proma.controller;


import static com.ssafy.proma.exception.Message.PROJECT_CHANGE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_CHANGE_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_DELETE_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_DELETE_SUCCESS_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_JOIN_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.PROJECT_JOIN_SUCCESS_MESSAGE;

import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectCreateDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectDeleteDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectJoinDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectUpdateDto;
import com.ssafy.proma.service.project.ProjectService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/project")
public class ProjectController {

  private final ProjectService projectService;

  @PostMapping
  public ResponseEntity createProject(@RequestBody ProjectCreateDto projectDto){

    projectService.createProject(projectDto);

    return ResponseEntity.ok().build();
  }

  @PostMapping("/join")
  public ResponseEntity joinProject(@RequestBody ProjectJoinDto projectJoinDto){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    String projectNo = projectJoinDto.getProjectNo();
    try{
      resultMap = projectService.joinProject(projectNo);
      if(resultMap.get("message").equals(PROJECT_JOIN_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {

      resultMap.put("message", PROJECT_JOIN_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "프로젝트 수정", notes = "프로젝트 이름 수정")
  @PutMapping("/change")
  public ResponseEntity updateProject(@RequestBody ProjectUpdateDto request) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap = projectService.changeProjectName(request);
      if(resultMap.get("message").equals(PROJECT_CHANGE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {

      resultMap.put("message", PROJECT_CHANGE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "프로젝트 종료", notes = "프로젝트 종료 및 삭제")
  @DeleteMapping("/{projectNo}")
  public ResponseEntity deleteProject(@PathVariable String projectNo) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap = projectService.deleteProject(projectNo);
      if(resultMap.get("message").equals(PROJECT_DELETE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {

      resultMap.put("message", PROJECT_DELETE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);

  }

  @GetMapping
  @ApiOperation(value = "유저의 프로젝트 목록", notes = "프로젝트 목록 조회")
  public ResponseEntity getProjectLst(){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = projectService.getProjectList();

      if(resultMap.get("message").equals("프로젝트 조회 성공")) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      log.error("알림 조회 실패 : {}", e.getMessage());

      resultMap.put("message", "프로젝트 조회 실패");
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);
  }

  @GetMapping("/{projectNo}")
  @ApiOperation(value = "단일 프로젝트 조회", notes = "프로젝트 정보 조회")
  public ResponseEntity getProject(@PathVariable String projectNo){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = projectService.getProject(projectNo);

      if(resultMap.get("message").equals("프로젝트 조회 성공")) {
        status = HttpStatus.OK;
      }
    } catch (Exception e) {
      log.error("프로젝트 조회 실패 : {}", e.getMessage());

      resultMap.put("message", "프로젝트 조회 실패");
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return new ResponseEntity(resultMap, status);
  }

  @GetMapping("/user/{projectNo}")
  @ApiOperation(value = "프로젝트 참여여부 조회", notes = "프로젝트 참여여부 조회")
  public ResponseEntity getUserInProject(@PathVariable String projectNo){
    Boolean isIn = projectService.getUserInProject(projectNo);
    return new ResponseEntity(isIn, HttpStatus.OK);
  }

}
