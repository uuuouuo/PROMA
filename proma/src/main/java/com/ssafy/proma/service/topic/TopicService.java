package com.ssafy.proma.service.topic;

import com.ssafy.proma.model.Dto.issue.ResIssueDto.TopicIssueDto;
import com.ssafy.proma.model.Dto.topic.ReqTopicDto.TopicCreateDto;
import com.ssafy.proma.model.Dto.topic.ReqTopicDto.TopicUpdateDto;
import com.ssafy.proma.model.Dto.topic.ResTopicDto.TopicDetailDto;
import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.repository.issue.IssueRepository;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.repository.topic.TopicRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TopicService {

  private final ProjectRepository projectRepository;
  private final TopicRepository topicRepository;
  private final IssueRepository issueRepository;

  @Transactional
  public void createTopic(TopicCreateDto topicDto){

    String projectNo = topicDto.getProjectNo();

    Optional<Project> projectOp = projectRepository.getProjectByNo(projectNo);
    Project project = takeOp(projectOp);

    Topic topic = topicDto.toEntity(project);
    topicRepository.save(topic);

  }

  public void updateTopic(Integer topicNo, TopicUpdateDto topicDto) {

    String title = topicDto.getTitle();
    String description = topicDto.getDescription();

    Optional<Topic> topicOp = topicRepository.getTopicByNo(topicNo);
    Topic topic = takeOp(topicOp);
    topic.update(title,description);
  }

  public List<TopicIssueDto> getIssueList(Integer topicNo) {

    Optional<Topic> topicOp = topicRepository.getTopicByNo(topicNo);
    Topic topic = takeOp(topicOp);

    Optional<List<Issue>> issueListOp = issueRepository.getAllByTopic(topic);
    List<Issue> issues = takeOp(issueListOp);

    List<TopicIssueDto> issueDtoList = issues.stream()
        .map(issue -> new TopicIssueDto(issue.getNo(), issue.getTitle())).collect(
            Collectors.toList());

    return issueDtoList;
  }

  public <T> T takeOp(Optional<T> op){
    return op.isPresent() ? op.get() : null;
  }

  public TopicDetailDto getTopicDetail(Integer topicNo) {

    Optional<Topic> topicOp = topicRepository.getTopicByNo(topicNo);
    Topic topic = takeOp(topicOp);

    TopicDetailDto topicDetailDto = new TopicDetailDto(topicNo,topic.getTitle(),topic.getDescription());

    return topicDetailDto;
  }
}
