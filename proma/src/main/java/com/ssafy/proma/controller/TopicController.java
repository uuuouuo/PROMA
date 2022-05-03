package com.ssafy.proma.controller;

import com.ssafy.proma.exception.Message;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueNoTitleDto;
import com.ssafy.proma.model.dto.topic.ReqTopicDto.TopicCreateDto;
import com.ssafy.proma.model.dto.topic.ReqTopicDto.TopicUpdateDto;
import com.ssafy.proma.model.dto.topic.ResTopicDto.TopicDetailDto;
import com.ssafy.proma.model.dto.topic.ResTopicDto.TopicNoNameDto;
import com.ssafy.proma.service.topic.TopicService;
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
@RequestMapping("/topic")
public class TopicController {

  private final TopicService topicService;

  @ApiOperation(value = "토픽 생성", notes = "토픽을 생성한다")
  @PostMapping
  public ResponseEntity createTopic(@RequestBody TopicCreateDto topicDto){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = topicService.createTopic(topicDto);

      if(resultMap.get("message").equals(Message.TOPIC_CREATE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e){
      log.error("토픽 생성 실패 : {}", e.getMessage());

      resultMap.put("message", Message.TOPIC_CREATE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "토픽 수정", notes = "토픽을 수정한다.")
  @PutMapping("/{topicNo}")
  public ResponseEntity updateTopic(@PathVariable Integer topicNo, @RequestBody TopicUpdateDto topicDto){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = topicService.updateTopic(topicNo, topicDto);

      if(resultMap.get("message").equals(Message.TOPIC_UPDATE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e){
      log.error("토픽 수정 실패 : {}", e.getMessage());

      resultMap.put("message", Message.TOPIC_UPDATE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "토픽에 포함된 이슈 조회", notes = "토픽에 포함된 이슈를 조회한다.")
  @GetMapping("/{topicNo}")
  public ResponseEntity getTopicIssue(@PathVariable Integer topicNo){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = topicService.getIssueList(topicNo);

      if(resultMap.get("message").equals(Message.ISSUE_FIND_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e){
      log.error("토픽 포함 이슈 조회 실패 : {}", e.getMessage());

      resultMap.put("message", Message.ISSUE_FIND_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "토픽 상세보기", notes = "토픽을 상세보기 한다. 토픽 번호와 이름, 설명을 반환한다.")
  @GetMapping("/detail/{topicNo}")
  public ResponseEntity getTopicDetail(@PathVariable Integer topicNo){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = topicService.getTopicDetail(topicNo);

      if(resultMap.get("message").equals(Message.TOPIC_FIND_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e){
      log.error("토픽 상세 조회 실패 : {}", e.getMessage());

      resultMap.put("message", Message.TOPIC_FIND_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "프로젝트의 모든 토픽 조회", notes = "해당 프로젝트의 모든 토픽을 조회한다. 토픽 번호와 이름을 반환한다.")
  @GetMapping("/list/{projectNo}")
  public ResponseEntity getTopicList(@PathVariable String projectNo){

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = topicService.getTopicList(projectNo);

      if(resultMap.get("message").equals(Message.TOPIC_LIST_FIND_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e){
      log.error("토픽 목록 조회 실패 : {}", e.getMessage());

      resultMap.put("message", Message.TOPIC_LIST_FIND_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }

  @ApiOperation(value = "토픽 삭제", notes = "해당 토픽을 삭제한다. 관련 하위 이슈들도 모두 삭제됨")
  @DeleteMapping("/{topicNo}")
  public ResponseEntity deleteTopic(@PathVariable Integer topicNo){
    log.debug(topicNo + " 토픽 삭제");

    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;

    try{
      resultMap = topicService.deleteTopic(topicNo);

      if(resultMap.get("message").equals(Message.TOPIC_DELETE_SUCCESS_MESSAGE)) {
        status = HttpStatus.OK;
      }
    } catch (Exception e){
      log.error("토픽 삭제 실패 : {}", e.getMessage());

      resultMap.put("message", Message.TOPIC_DELETE_ERROR_MESSAGE);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return new ResponseEntity(resultMap, status);
  }
}
