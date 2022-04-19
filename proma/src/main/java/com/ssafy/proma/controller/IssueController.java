package com.ssafy.proma.controller;

import com.ssafy.proma.service.issue.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/issue")
public class IssueController {

  private final IssueService issueService;

  // 이슈 생성
//  @PostMapping
//  public ResponseEntity createIssue(@RequestBody )


  // 이슈 수정

  // 스프린트, 팀에 속한 이슈 조회

  //백로그, 팀에 속한 이슈 조회

  //팀에 속한 todo

  //팀에 속한 in progress

  //팀에 속한 done

  // 이슈 스프린트 할당

  // 이슈 상태 바꾸기


}
