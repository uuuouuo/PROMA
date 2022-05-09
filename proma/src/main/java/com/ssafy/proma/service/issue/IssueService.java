package com.ssafy.proma.service.issue;

import com.ssafy.proma.exception.Message;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueCreateDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueSprintDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueStatusDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueUpdateDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.TopicDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueNoTitleDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamIssueDto;
import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.issue.IssueRepository;
import com.ssafy.proma.repository.sprint.SprintRepository;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.repository.topic.TopicRepository;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.service.AbstractService;
import com.ssafy.proma.util.SecurityUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IssueService extends AbstractService {

  private final IssueRepository issueRepository;
  private final SprintRepository sprintRepository;
  private final TeamRepository teamRepository;
  private final TopicRepository topicRepository;
  private final UserRepository userRepository;
  private final SecurityUtil securityUtil;

  @Transactional
  public Map<String, Object> createIssue(IssueCreateDto issueCreateDto) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Integer sprintNo = issueCreateDto.getSprintNo();
    Integer teamNo = issueCreateDto.getTeamNo();
    Integer topicNo = issueCreateDto.getTopicNo();
    String userNo = issueCreateDto.getUserNo();

    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Issue issue = issueCreateDto.toEntity(sprint, team, topic, user);

    issueRepository.save(issue);

    resultMap.put("message", Message.ISSUE_CREATE_SUCCESS_MESSAGE);

    return resultMap;
  }

  @Transactional
  public Map<String, Object> updateIssue(Integer issueNo, IssueUpdateDto issueUpdateDto) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    String title = issueUpdateDto.getTitle();
    String description = issueUpdateDto.getDescription();
    Integer topicNo = issueUpdateDto.getTopicNo();

    String userNo = issueUpdateDto.getUserNo();

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<Issue> issueOp = issueRepository.findByNo(issueNo);
    Issue issue = takeOp(issueOp);

    issue.update(title,description,user,topic);

    resultMap.put("message", Message.ISSUE_UPDATE_SUCCESS_MESSAGE);

    return resultMap;
  }

  public Map<String, Object> getSprintTeamIssue(Integer sprintNo, Integer teamNo,Boolean onlyMyIssue) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    Optional<List<Issue>> issueListOp = null;

    if(sprintNo == null ){
      issueListOp = issueRepository.findByTeamAndSprintNull(team);
    }
    else{
      Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
      Sprint sprint = takeOp(sprintOp);

      issueListOp = issueRepository.findBySprintAndTeam(sprint,team);
    }

    List<Issue> issues = takeOp(issueListOp);

    List<IssueNoTitleDto> issueList = null;
    if(onlyMyIssue) {
      issueList = issues.stream()
          .map(issue -> new IssueNoTitleDto(issue.getNo()
              , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle(),issue.getStatus()))
          .collect(Collectors.toList());

    }
    else {

      String userNo = securityUtil.getCurrentUserNo();
      issueList = issues.stream()
          .filter(issue->issue.getUser().getNo().equals(userNo))
          .map(issue -> new IssueNoTitleDto(issue.getNo()
              , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle(),issue.getStatus()))
          .collect(Collectors.toList());
    }

    resultMap.put("issueList", issueList);
    resultMap.put("message", Message.ISSUE_FIND_SUCCESS_MESSAGE);

    return resultMap;
  }

  public Map<String, Object> getStatueIssue(String status, Integer teamNo,Integer sprintNo,Boolean onlyMyIssue) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);
    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    Optional<List<Issue>> issueListOp = issueRepository.findByTeamAndSprintAndStatusLike(team,sprint,status);
    List<Issue> issues = takeOp(issueListOp);


    List<IssueNoTitleDto> issueList = null;
    if(onlyMyIssue) {
      issueList = issues.stream()
          .map(issue -> new IssueNoTitleDto(issue.getNo()
              , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle(),issue.getStatus()))
          .collect(Collectors.toList());

    }
    else {

      String userNo = securityUtil.getCurrentUserNo();
      issueList = issues.stream()
          .filter(issue->issue.getUser().getNo().equals(userNo))
          .map(issue -> new IssueNoTitleDto(issue.getNo()
              , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle(),issue.getStatus()))
          .collect(Collectors.toList());
    }

    resultMap.put("issueList", issueList);
    resultMap.put("message", Message.ISSUE_FIND_SUCCESS_MESSAGE);

    return resultMap;
  }

  @Transactional
  public Map<String, Object> assignSprintIssue(IssueSprintDto issueSprintDto) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Integer issueNo = issueSprintDto.getIssueNo();
    Integer sprintNo = issueSprintDto.getSprintNo();

    Optional<Issue> issueOp = issueRepository.findByNo(issueNo);
    Issue issue = takeOp(issueOp);

    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    //존재하지 않는 스프린트라면 에러 없이 null로 등록됨,,
    issue.assignSprint(sprint);

    resultMap.put("message", Message.ISSUE_UPDATE_SUCCESS_MESSAGE);

    return resultMap;
  }

  @Transactional
  public Map<String, Object> changeStatusIssue(IssueStatusDto issueStatusDto) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Integer issueNo = issueStatusDto.getIssueNo();
    String status = issueStatusDto.getStatus();

    Optional<Issue> issueOp = issueRepository.findByNo(issueNo);
    Issue issue = takeOp(issueOp);

    issue.changeStatus(status);

    resultMap.put("message", Message.ISSUE_UPDATE_SUCCESS_MESSAGE);

    return resultMap;
  }

  public Map<String, Object> getUserIssue(Integer teamNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userByNo = userRepository.findByNo(userNo);
    User user = takeOp(userByNo);

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    Optional<List<Issue>> issueListOp = issueRepository.findByUserAndTeam(user,team);
    List<Issue> issues = takeOp(issueListOp);

    List<IssueNoTitleDto> issueList = issues.stream()
        .map(issue -> new IssueNoTitleDto(issue.getNo()
            , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle(),issue.getStatus()))
        .collect(Collectors.toList());

    resultMap.put("issueList", issueList);
    resultMap.put("message", Message.ISSUE_FIND_SUCCESS_MESSAGE);

    return resultMap;
  }

  public Map<String, Object> getDetailsIssue(Integer issueNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Issue> issueOp = issueRepository.findByNo(issueNo);
    Issue issue = takeOp(issueOp);
    String issueTitle = issue.getTitle();
    String description = issue.getDescription();
    String status = issue.getStatus();

    User user = issue.getUser();
    String userNo = user.getNo();
    String nickname = user.getNickname();
    String image = user.getProfileImage();
    Team team = issue.getTeam();
    Integer teamNo = team.getNo();
    String teamName = team.getName();

    Topic topic = issue.getTopic();
    Integer topicNo = topic.getNo();
    String topicTitle = topic.getTitle();

    IssueDetailsDto issueDetailsDto = new IssueDetailsDto(issueNo,
        new TeamIssueDto(teamNo, teamName), issueTitle, description, status
            , new TopicDto(topicNo, topicTitle), new UserDto(userNo, nickname,image));

    resultMap.put("issueDetail", issueDetailsDto);
    resultMap.put("message", Message.ISSUE_FIND_SUCCESS_MESSAGE);

    return resultMap;
  }

  @Transactional
  public Map<String, Object> deleteIssue(Integer issueNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    issueRepository.deleteById(issueNo);

    resultMap.put("message", Message.ISSUE_DELETE_SUCCESS_MESSAGE);

    return resultMap;
  }
}
