package com.ssafy.proma.service.issue;

import static com.ssafy.proma.exception.Message.SPRINT_GET_ERROR_MESSAGE;
import static com.ssafy.proma.exception.Message.SPRINT_GET_SUCCESS_MESSAGE;

import com.ssafy.proma.exception.Message;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueCreateDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueSprintDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueStatusDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueUpdateDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.TopicDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueNoTitleDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintDto;
import com.ssafy.proma.model.dto.sprint.ResSprintDto.SprintTeamDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamIssueDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamIssueListDto;
import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.model.entity.team.Team;
import com.ssafy.proma.model.entity.team.UserTeam;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.issue.IssueRepository;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.sprint.SprintRepository;
import com.ssafy.proma.repository.team.TeamRepository;
import com.ssafy.proma.repository.team.UserTeamRepository;
import com.ssafy.proma.repository.topic.TopicRepository;
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.service.AbstractService;
import com.ssafy.proma.util.SecurityUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
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
  private final ProjectRepository projectRepository;
  private final UserTeamRepository userTeamRepository;

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

  public Map<String, Object> getSprintTeamIssue(String projectNo,Boolean onlyMyIssue) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    List<SprintTeamDto> issueList = new ArrayList<>();

    List<Sprint> sprintList = getSprintList(project);
    List<Team> teamList = getTeamList(project);
    sprintList.add(null);

    Map<Team, Boolean> userTeamList = getUserTeamList(project, teamList);

    for(Sprint sprint : sprintList) {
      List<TeamIssueListDto> teams = new ArrayList<>();
      for(Team team : teamList) {
        Boolean isMember = userTeamList.get(team) == null ? false : true;

        Optional<List<Issue>> sprintOp = issueRepository.findBySprintAndTeam(sprint,team);
        List<Issue> issueEntityList = takeOp(sprintOp);

        List<IssueNoTitleDto> issues;
        if(!onlyMyIssue) {
          issues = issueEntityList.stream()
              .map(issue -> new IssueNoTitleDto(issue.getNo()
                  , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle(),issue.getStatus()))
              .collect(Collectors.toList());
        }
        else {
          String userNo = securityUtil.getCurrentUserNo();
          issues = issueEntityList.stream()
              .filter(issue->issue.getUser().getNo().equals(userNo))
              .map(issue -> new IssueNoTitleDto(issue.getNo()
                  , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle(),issue.getStatus()))
              .collect(Collectors.toList());
        }
        teams.add(new TeamIssueListDto(team.getNo(), team.getName(),isMember, issues));
      }
      if(sprint == null) {
        issueList.add(new SprintTeamDto(teams));
      }
      else {
        issueList.add(new SprintTeamDto(sprint.getNo(), sprint.getName(), sprint.getStartDate().toString(),sprint.getEndDate().toString(),sprint.getStatus(),teams));
      }
    }
    resultMap.put("issueList", issueList);
    resultMap.put("message", Message.ISSUE_FIND_SUCCESS_MESSAGE);

    return resultMap;
  }

  private Map<Team,Boolean> getUserTeamList(Project project, List<Team> teamList) {

    // 유저가 속한 팀 확인
    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Map<Team,Boolean> userTeamList = new HashMap<>();

    for(Team team : teamList) {

      Optional<UserTeam> byUserAndTeam = userTeamRepository.findByUserAndTeam(user, team);
      UserTeam userTeam = takeOp(byUserAndTeam);
      if(userTeam != null ) userTeamList.put(userTeam.getTeam(),true);
    }

    return userTeamList;
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
    if(!onlyMyIssue) {
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
    Integer sprintNo = issue.getSprint().getNo();

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
            , new TopicDto(topicNo, topicTitle), new UserDto(userNo, nickname,image),sprintNo);

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

  public List<Sprint> getSprintList(Project project) {

    Sort sort = Sort.by(
        Sort.Order.desc("status"),
        Sort.Order.asc("startDate")
    );

    Optional<List<Sprint>> projectListOp = sprintRepository.findAllByProjectAndStatusLessThan(project,2,sort);
    List<Sprint> sprintList = takeOp(projectListOp);

    return sprintList;
  }

  public List<Team> getTeamList(Project project) {

    Optional<List<Team>> teamListOp = teamRepository.findByProject(project);
    List<Team> teamList = takeOp(teamListOp);

    return teamList;
  }
}
