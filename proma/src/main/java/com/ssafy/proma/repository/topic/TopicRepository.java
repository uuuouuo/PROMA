package com.ssafy.proma.repository.topic;

import com.ssafy.proma.model.entity.project.Project;
import com.ssafy.proma.model.entity.topic.Topic;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic,Integer> {

  Optional<Topic> getTopicByNo(Integer topicNo);

  Optional<List<Topic>> getAllByProject(Project project);

//  Optional<Topic> getTopicByTitle

}
