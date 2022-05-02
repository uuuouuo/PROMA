package com.ssafy.proma.service.issue;

import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueCreateDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueSprintDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueStatusDto;
import com.ssafy.proma.model.dto.issue.ReqIssueDto.IssueUpdateDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.TopicDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueNoTitleDto;
import com.ssafy.proma.model.dto.team.ResTeamDto.TeamDto;
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
import java.util.List;
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
  public void createIssue(IssueCreateDto issueCreateDto) {

    Integer sprintNo = issueCreateDto.getSprintNo();
    Integer teamNo = issueCreateDto.getTeamNo();
    Integer topicNo = issueCreateDto.getTopicNo();

    String userNo = securityUtil.getCurrentUserNo();

//    String userNo = issueCreateDto.getUserNo();

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


  }

  @Transactional
  public void updateIssue(Integer issueNo, IssueUpdateDto issueUpdateDto) {

    String title = issueUpdateDto.getTitle();
    String description = issueUpdateDto.getDescription();
    Integer topicNo = issueUpdateDto.getTopicNo();

    String userNo = securityUtil.getCurrentUserNo();

//    String userNo = issueUpdateDto.getUserNo();


    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);

    Optional<User> userOp = userRepository.findByNo(userNo);
    User user = takeOp(userOp);

    Optional<Issue> issueOp = issueRepository.findByNo(issueNo);
    Issue issue = takeOp(issueOp);

    issue.update(title,description,user,topic);

  }

  public List<IssueNoTitleDto> getSprintTeamIssue(Integer sprintNo, Integer teamNo) {

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

    List<IssueNoTitleDto> issueList = issues.stream()
        .map(issue -> new IssueNoTitleDto(issue.getNo()
            , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname()), issue.getTitle()))
        .collect(Collectors.toList());

    return issueList;
  }

  public List<IssueNoTitleDto> getStatueIssue(String status, Integer teamNo) {

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    Optional<List<Issue>> issueListOp = issueRepository.findByTeamAndStatusLike(team,status);
    List<Issue> issues = takeOp(issueListOp);

    List<IssueNoTitleDto> issueList = issues.stream()
        .map(issue -> new IssueNoTitleDto(issue.getNo()
            , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname()), issue.getTitle()))
        .collect(Collectors.toList());

    return issueList;
  }

  @Transactional
  public void assignSprintIssue(IssueSprintDto issueSprintDto) {

    Integer issueNo = issueSprintDto.getIssueNo();
    Integer sprintNo = issueSprintDto.getSprintNo();

    Optional<Issue> issueOp = issueRepository.findByNo(issueNo);
    Issue issue = takeOp(issueOp);

    Optional<Sprint> sprintOp = sprintRepository.findByNo(sprintNo);
    Sprint sprint = takeOp(sprintOp);

    issue.assignSprint(sprint);

  }

  @Transactional
  public void changeStatusIssue(IssueStatusDto issueStatusDto) {

    Integer issueNo = issueStatusDto.getIssueNo();
    String status = issueStatusDto.getStatus();

    Optional<Issue> issueOp = issueRepository.findByNo(issueNo);
    Issue issue = takeOp(issueOp);

    issue.changeStatus(status);

  }

  public List<IssueNoTitleDto> getUserIssue(Integer teamNo) {

    String userNo = securityUtil.getCurrentUserNo();
    Optional<User> userByNo = userRepository.findByNo(userNo);
    User user = takeOp(userByNo);

    Optional<Team> teamOp = teamRepository.findByNo(teamNo);
    Team team = takeOp(teamOp);

    Optional<List<Issue>> issueListOp = issueRepository.findByUserAndTeam(user,team);
    List<Issue> issues = takeOp(issueListOp);

    List<IssueNoTitleDto> issueList = issues.stream()
        .map(issue -> new IssueNoTitleDto(issue.getNo()
            , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname()), issue.getTitle()))
        .collect(Collectors.toList());

    return issueList;
  }

  public IssueDetailsDto getDetailsIssue(Integer issueNo) {

    Optional<Issue> issueOp = issueRepository.findByNo(issueNo);
    Issue issue = takeOp(issueOp);
    String issueTitle = issue.getTitle();
    String description = issue.getDescription();
    String status = issue.getStatus();

    User user = issue.getUser();
    String userNo = user.getNo();
    String nickname = user.getNickname();

    Team team = issue.getTeam();
    Integer teamNo = team.getNo();
    String teamName = team.getName();

    Topic topic = issue.getTopic();
    Integer topicNo = topic.getNo();
    String topicTitle = topic.getTitle();

    IssueDetailsDto issueDetailsDto = new IssueDetailsDto(issueNo,
        new TeamDto(teamNo, teamName), issueTitle, description, status
            , new TopicDto(topicNo, topicTitle), new UserDto(userNo, nickname));

    return issueDetailsDto;
  }
}
