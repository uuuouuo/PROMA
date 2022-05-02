package com.ssafy.proma.service.topic;

import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueDetailsDto.UserDto;
import com.ssafy.proma.model.dto.issue.ResIssueDto.IssueNoTitleDto;
import com.ssafy.proma.model.dto.topic.ReqTopicDto.TopicCreateDto;
import com.ssafy.proma.model.dto.topic.ReqTopicDto.TopicUpdateDto;
import com.ssafy.proma.model.dto.topic.ResTopicDto.TopicDetailDto;
import com.ssafy.proma.model.dto.topic.ResTopicDto.TopicNoNameDto;
import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.repository.issue.IssueRepository;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.topic.TopicRepository;
import com.ssafy.proma.service.AbstractService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TopicService extends AbstractService {

  private final ProjectRepository projectRepository;
  private final TopicRepository topicRepository;
  private final IssueRepository issueRepository;

  @Transactional
  public void createTopic(TopicCreateDto topicDto){

    String projectNo = topicDto.getProjectNo();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    Topic topic = topicDto.toEntity(project);
    topicRepository.save(topic);

  }

  @Transactional
  public void updateTopic(Integer topicNo, TopicUpdateDto topicDto) {

    String title = topicDto.getTitle();
    String description = topicDto.getDescription();

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);
    topic.update(title,description);
  }

  public List<IssueNoTitleDto> getIssueList(Integer topicNo) {

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);

    Optional<List<Issue>> issueListOp = issueRepository.findByTopic(topic);
    List<Issue> issues = takeOp(issueListOp);

    List<IssueNoTitleDto> issueDtoList = issues.stream()
        .map(issue -> new IssueNoTitleDto(issue.getNo()
            , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle()))
        .collect(Collectors.toList());

    return issueDtoList;
  }

  public TopicDetailDto getTopicDetail(Integer topicNo) {

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);

    TopicDetailDto topicDetailDto = new TopicDetailDto(topicNo,topic.getTitle(),topic.getDescription());

    return topicDetailDto;
  }

  public List<TopicNoNameDto> getTopicList(String projectNo) {

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    Optional<List<Topic>> topicListOp = topicRepository.findAllByProject(project);
    List<Topic> topics = takeOp(topicListOp);

    List<TopicNoNameDto> topicNoNameList = topics.stream()
        .map(topic -> new TopicNoNameDto(topic.getNo(), topic.getTitle()))
        .collect(Collectors.toList());

    return topicNoNameList;
  }
}
