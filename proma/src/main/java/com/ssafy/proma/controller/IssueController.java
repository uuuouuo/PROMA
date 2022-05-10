package com.ssafy.proma.controller;

import com.ssafy.proma.exception.Message;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueCreateDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueSprintDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueStatusDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueUpdateDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueNoTitleDto;
import com.ssafy.proma.service.issue.IssueService;
import io.swagger.annotations.ApiOperation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/issue")
public class IssueController {

  private final IssueService issueService;

  @PostMapping
  @ApiOperation(value = "이슈 생성", notes = "이슈를 생성한다.제목,설명,스프린트 번호,팀 번호, 토픽 번호, 유저아이디, 담당자, 상태를 보낸다")
  public ResponseEntity createIssue(@RequestBody IssueCreateDto issueCreateDto) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.createIssue(issueCreateDto);

      if (resultMap.get("message").equals(Message.ISSUE_CREATE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 생성 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_CREATE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

  @PutMapping("/{issueNo}")
  @ApiOperation(value = "이슈 수정", notes = "이슈를 수정한다.제목,설명,스프린트 번호,팀 번호, 토픽 번호, 유저아이디, 담당자, 상태를 보낸다")
  public ResponseEntity updateIssue(@PathVariable Integer issueNo, @RequestBody IssueUpdateDto issueUpdateDto) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.updateIssue(issueNo,issueUpdateDto);

      if (resultMap.get("message").equals(Message.ISSUE_UPDATE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 수정 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_UPDATE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }
  @GetMapping
  @ApiOperation(value = "스프린트 혹은 백로그,팀에 속한 이슈 조회", notes = "스프린트 혹은 백로그, 팀에 속한 이슈를 조회한다. 이슈 번호, 이슈 제목을 보낸다")
  public ResponseEntity getSprintTeamIssue(
      @RequestParam(value="projectNo") String projectNo,
      @RequestParam(value="onlyMyIssue") Boolean onlyMyIssue) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.getSprintTeamIssue(projectNo,onlyMyIssue);

      if (resultMap.get("message").equals(Message.ISSUE_FIND_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 조회 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_FIND_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

  @GetMapping("/{teamNo}")
  @ApiOperation(value = "팀에 속한 이슈를 상태별 조회", notes = "팀에 속한 이슈를 상태별 조회한다. 이슈 번호, 이슈 제목을 보낸다")
  public ResponseEntity getStatueIssue(
      @PathVariable Integer teamNo,
      @RequestParam(value="status") String status,
      @RequestParam(value="sprintNo") Integer sprintNo,
      @RequestParam(value="onlyMyIssue") Boolean onlyMyIssue) {

    //sprintNo가 required = true?
    
    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus httpStatus = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.getStatueIssue(status,teamNo,sprintNo,onlyMyIssue);

      if (resultMap.get("message").equals(Message.ISSUE_FIND_SUCCESS_MESSAGE)) {
        httpStatus = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 조회 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_FIND_ERROR_MESSAGE);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, httpStatus);
  }

  @PutMapping("/sprint")
  @ApiOperation(value = "이슈 스프린트 할당", notes = "이슈에 스프린트를 할당한다.")
  public ResponseEntity assignSprintIssue(@RequestBody IssueSprintDto issueSprintDto) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus httpStatus = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.assignSprintIssue(issueSprintDto);

      if (resultMap.get("message").equals(Message.ISSUE_UPDATE_SUCCESS_MESSAGE)) {
        httpStatus = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 스프린트 할당 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_UPDATE_ERROR_MESSAGE);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, httpStatus);
  }

  @PutMapping("/status")
  @ApiOperation(value = "이슈 상태 설정", notes = "이슈의 상태를 바꾼다.")
  public ResponseEntity changeStatusIssue(@RequestBody IssueStatusDto issueStatusDto) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus httpStatus = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.changeStatusIssue(issueStatusDto);

      if (resultMap.get("message").equals(Message.ISSUE_UPDATE_SUCCESS_MESSAGE)) {
        httpStatus = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 상태 설정 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_UPDATE_ERROR_MESSAGE);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, httpStatus);
  }

  @GetMapping("/user/{teamNo}")
  @ApiOperation(value = "내 이슈만 조회", notes = "내 이슈만 조회한다.")
  public ResponseEntity getUserIssue(@PathVariable Integer teamNo) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus httpStatus = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.getUserIssue(teamNo);

      if (resultMap.get("message").equals(Message.ISSUE_FIND_SUCCESS_MESSAGE)) {
        httpStatus = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 조회 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_FIND_ERROR_MESSAGE);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, httpStatus);
  }

  @GetMapping("/details/{issueNo}")
  @ApiOperation(value = "이슈 상세보기", notes = "이슈를 상세보기한다. ")
  public ResponseEntity<IssueDetailsDto> getDetailsIssue(@PathVariable Integer issueNo) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus httpStatus = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.getDetailsIssue(issueNo);

      if (resultMap.get("message").equals(Message.ISSUE_FIND_SUCCESS_MESSAGE)) {
        httpStatus = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 조회 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_FIND_ERROR_MESSAGE);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, httpStatus);
  }

  @DeleteMapping("{issueNo}")
  @ApiOperation(value = "이슈 삭제", notes = "해당 이슈를 삭제한다.")
  public ResponseEntity deleteIssue(@PathVariable Integer issueNo) {

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try {
      resultMap = issueService.deleteIssue(issueNo);

      if (resultMap.get("message").equals(Message.ISSUE_DELETE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch(Exception e){
      log.error("이슈 삭제 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_DELETE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

//  @GetMapping
//  @ApiOperation(value = "스프린트 혹은 백로그,팀에 속한 이슈 조회", notes = "스프린트 혹은 백로그, 팀에 속한 이슈를 조회한다. 이슈 번호, 이유 제목을 보낸다")
//  public ResponseEntity<List<IssueNoTitleDto>> getIssue(
//      @RequestParam(value="sprintNo",required = false) Integer sprintNo,
//      @RequestParam(value="teamNo") Integer teamNo,
//      @RequestParam(value="status") String status,
//      @RequestParam(value="onlyMyIssue") Boolean onlyMyIssue) {
//
//    List<IssueNoTitleDto> issueList = issueService.getIssue(sprintNo,teamNo,status,onlyMyIssue);
//
//    return new ResponseEntity<>(issueList, HttpStatus.OK);
//
//  }

}
