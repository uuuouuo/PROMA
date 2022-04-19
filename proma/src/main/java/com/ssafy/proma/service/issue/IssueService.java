package com.ssafy.proma.service.issue;

import com.ssafy.proma.repository.issue.IssueRepository;
import com.ssafy.proma.service.AbstractService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IssueService extends AbstractService {

  private final IssueRepository issueRepository;



}
