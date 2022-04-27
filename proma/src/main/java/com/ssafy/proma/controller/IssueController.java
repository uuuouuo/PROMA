package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueCreateDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueSprintDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueStatusDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueUpdateDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueNoTitleDto;
import com.ssafy.proma.service.issue.IssueService;
import io.swagger.annotations.ApiOperation;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/issue")
public class IssueController {

  private final IssueService issueService;

  // 이슈 생성
  @PostMapping
  @ApiOperation(value = "이슈 생성", notes = "이슈를 생성한다.제목,설명,스프린트 번호,팀 번호, 토픽 번호, 유저아이디, 담당자, 상태를 보낸다")
  public ResponseEntity createIssue(@RequestBody IssueCreateDto issueCreateDto) {

    issueService.createIssue(issueCreateDto);

    return ResponseEntity.ok().build();
  }

  // 이슈 수정
  @PutMapping("/{issueNo}")
  @ApiOperation(value = "이슈 수정", notes = "이슈를 수정한다.제목,설명,스프린트 번호,팀 번호, 토픽 번호, 유저아이디, 담당자, 상태를 보낸다")
  public ResponseEntity updateIssue(@PathVariable Integer issueNo, @RequestBody IssueUpdateDto issueUpdateDto) {

    issueService.updateIssue(issueNo,issueUpdateDto);

    return ResponseEntity.ok().build();
  }

  // 스프린트, 팀에 속한 이슈 조회
  @GetMapping
  @ApiOperation(value = "스프린트 혹은 백로그,팀에 속한 이슈 조회", notes = "스프린트 혹은 백로그, 팀에 속한 이슈를 조회한다. 이슈 번호, 이유 제목을 보낸다")
  public ResponseEntity<List<IssueNoTitleDto>> getSprintTeamIssue(
      @RequestParam(value="sprintNo",required = false) Integer sprintNo,
      @RequestParam(value="teamNo") Integer teamNo) {

    List<IssueNoTitleDto> issueList = issueService.getSprintTeamIssue(sprintNo,teamNo);

    return new ResponseEntity<>(issueList, HttpStatus.OK);

  }

  @GetMapping("/{teamNo}")
  @ApiOperation(value = "팀에 속한 이슈를 상태별 조회", notes = "팀에 속한 이슈를 상태별 조회한다. 이슈 번호, 이유 제목을 보낸다")
  public ResponseEntity<List<IssueNoTitleDto>> getStatueIssue(
      @PathVariable Integer teamNo,
      @RequestParam(value="status") String status) {

    List<IssueNoTitleDto> issueList = issueService.getStatueIssue(status,teamNo);

    return new ResponseEntity<>(issueList, HttpStatus.OK);

  }

  // 이슈 스프린트 할당
  @PutMapping("/sprint")
  @ApiOperation(value = "이슈 스프린트 할당", notes = "이슈에 스프린트를 할당한다.")
  public ResponseEntity assignSprintIssue(
      @RequestBody IssueSprintDto issueSprintDto) {

    issueService.assignSprintIssue(issueSprintDto);

    return ResponseEntity.ok().build();

  }

  // 이슈 상태 바꾸기
  @PutMapping("/status")
  @ApiOperation(value = "이슈 상태 설정", notes = "이슈의 상태를 바꾼다.")
  public ResponseEntity changeStatusIssue(
      @RequestBody IssueStatusDto issueStatusDto) {

    issueService.changeStatusIssue(issueStatusDto);

    return ResponseEntity.ok().build();

  }

  // 내 이슈만 조회
  @GetMapping("/user/{teamNo}")
  @ApiOperation(value = "내 이슈만 조회", notes = "내 이슈만 조회한다.")
  public ResponseEntity<List<IssueNoTitleDto>> getUserIssue(
      @PathVariable Integer teamNo) {

    List<IssueNoTitleDto> issueList = issueService.getUserIssue(teamNo);

    return new ResponseEntity<>(issueList, HttpStatus.OK);

  }


  // 이슈 상세
  @GetMapping("/details/{issueNo}")
  @ApiOperation(value = "이슈 상세보기", notes = "이슈를 상세보기한다. ")
  public ResponseEntity<IssueDetailsDto> getDetailsIssue(
      @PathVariable Integer issueNo) {

    IssueDetailsDto issueDetails = issueService.getDetailsIssue(issueNo);

    return new ResponseEntity<>(issueDetails, HttpStatus.OK);

  }

}
