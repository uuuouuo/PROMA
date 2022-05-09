package com.ssafy.proma.service.topic;

import com.ssafy.proma.exception.Message;
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
public class TopicService extends AbstractService {

  private final ProjectRepository projectRepository;
  private final TopicRepository topicRepository;
  private final IssueRepository issueRepository;

  @Transactional
  public Map<String, Object> createTopic(TopicCreateDto topicDto) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    String projectNo = topicDto.getProjectNo();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    //존재하지 않는 프로젝트 예외 처리?

    Topic topic = topicDto.toEntity(project);
    topicRepository.save(topic);

    resultMap.put("message", Message.TOPIC_CREATE_SUCCESS_MESSAGE);

    return resultMap;
  }

  @Transactional
  public Map<String, Object> updateTopic(Integer topicNo, TopicUpdateDto topicDto) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    String title = topicDto.getTitle();
    String description = topicDto.getDescription();

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);
    topic.update(title,description);

    resultMap.put("message", Message.TOPIC_UPDATE_SUCCESS_MESSAGE);

    return resultMap;
  }

  public Map<String, Object> getIssueList(Integer topicNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);

    Optional<List<Issue>> issueListOp = issueRepository.findByTopic(topic);
    List<Issue> issues = takeOp(issueListOp);

    List<IssueNoTitleDto> issueDtoList = issues.stream()
        .map(issue -> new IssueNoTitleDto(issue.getNo()
            , new UserDto(issue.getUser().getNo(), issue.getUser().getNickname(),issue.getUser().getProfileImage()), issue.getTitle(),issue.getStatus()))
        .collect(Collectors.toList());

    resultMap.put("issueList", issueDtoList);
    resultMap.put("message", Message.ISSUE_FIND_SUCCESS_MESSAGE);

    return resultMap;
  }

  public Map<String, Object> getTopicDetail(Integer topicNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);

    TopicDetailDto topicDetailDto = new TopicDetailDto(topicNo,topic.getTitle(),topic.getDescription());

    resultMap.put("topicDetail", topicDetailDto);
    resultMap.put("message", Message.TOPIC_FIND_SUCCESS_MESSAGE);

    return resultMap;
  }

  public Map<String, Object> getTopicList(String projectNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Project> projectOp = projectRepository.findByNo(projectNo);
    Project project = takeOp(projectOp);

    Optional<List<Topic>> topicListOp = topicRepository.findAllByProject(project);
    List<Topic> topics = takeOp(topicListOp);

    List<TopicNoNameDto> topicNoNameList = topics.stream()
        .map(topic -> new TopicNoNameDto(topic.getNo(), topic.getTitle()))
        .collect(Collectors.toList());

    resultMap.put("topicList", topicNoNameList);
    resultMap.put("message", Message.TOPIC_FIND_SUCCESS_MESSAGE);

    return resultMap;
  }

  @Transactional
  public Map<String, Object> deleteTopic(Integer topicNo) throws Exception {
    Map<String, Object> resultMap = new HashMap<>();

    Optional<Topic> topicOp = topicRepository.findByNo(topicNo);
    Topic topic = takeOp(topicOp);

    issueRepository.deleteAllByTopic(topic);
    topicRepository.deleteById(topicNo);

    resultMap.put("message", Message.TOPIC_DELETE_SUCCESS_MESSAGE);

    return resultMap;
  }
}
