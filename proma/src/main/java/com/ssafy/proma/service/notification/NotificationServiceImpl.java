package com.ssafy.proma.service.notification;

import com.ssafy.proma.model.dto.notification.NotificationDto;
import com.ssafy.proma.model.entity.issue.Issue;
import com.ssafy.proma.model.entity.notification.Notification;
import com.ssafy.proma.model.entity.project.UserProject;
import com.ssafy.proma.model.entity.sprint.Sprint;
import com.ssafy.proma.model.entity.topic.Topic;
import com.ssafy.proma.model.entity.user.User;
import com.ssafy.proma.repository.Notification.NotificationRepository;
import com.ssafy.proma.repository.issue.IssueRepository;
import com.ssafy.proma.repository.project.UserProjectRepository;
import com.ssafy.proma.service.topic.TopicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{

    private final SimpMessageSendingOperations messagingTemplate;
    private final NotificationRepository notificationRepository;
    private final UserProjectRepository userProjectRepository;
    private final IssueRepository issueRepository;
    private final TopicService topicService;

    @Override
    public Map<String, Object> getNotificationList(String userNo) throws Exception {

        Map<String, Object> resultMap = new HashMap<>();
        List<Notification> notifications = notificationRepository.findByUserNoOrderByCheckedAscNotificationTimeDesc(userNo);

        List<NotificationDto>  notificationList = notifications.stream().map(
            notification -> new NotificationDto(notification.getNo(), notification.getMessage(), notification.isChecked(), notification.getNotificationTime())
        ).collect(Collectors.toList());

        resultMap.put("notificationList", notificationList);
        resultMap.put("message", "알림 조회 성공");

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> checkNotification(Integer notificationNo) throws Exception {

        Map<String, Object> resultMap = new HashMap<>();

        Optional<Notification> notification = notificationRepository.findById(notificationNo);
        if(notification.isEmpty())
            throw new NullPointerException("해당 알림이 존재하지 않습니다");

        notification.get().toggleStatus();
        resultMap.put("message", "알림 확인 성공");

        return resultMap;
    }

    @Override
    @Transactional
    public void sendSprintNotification(Sprint sprint) {

        //SprintService에서 notificationService.sendSprintNotification(sprint);

        String message = "스프린트 [ " +sprint.getName() + " ] 가 " + (sprint.getStatus() ? "시작" : "종료") + "되었습니다.";
        log.debug(message);

        List<UserProject> userProjectList = userProjectRepository.findByProject(sprint.getProject());
        for(UserProject project : userProjectList){

            //알림 저장 & 전송
            User user = project.getUser();

            notificationRepository.save(Notification.builder().user(user).message(message).build());
            NotificationDto notification = new NotificationDto();
            notification.setMessage(message);
            messagingTemplate.convertAndSend("/queue/notification/" + user.getNo(), notification);

            log.debug(user.getNickname() + " 알림 전송 완료");
        }
    }

    public void sendTopicNotification(Issue issue) {

        Topic topic = issueRepository.findById(issue.getNo()).get().getTopic();

        String message = "토픽 [ " + topic.getTitle() + " ] 의 이슈 [ " +  issue.getTitle() + " ] 이/가 완료되었습니다.";
        log.debug(message);

        List<Issue> issueList = issueRepository.findByTopic(topic).get();
        for(Issue relatedIssue : issueList){

            notificationRepository.save(Notification.builder().user(relatedIssue.getUser()).message(message).build());
            NotificationDto notification = new NotificationDto();
            notification.setMessage(message);
            messagingTemplate.convertAndSend("/queue/notification/" + relatedIssue.getUser().getNo(), notification);

            log.debug(relatedIssue.getUser().getNickname() + " 알림 전송 완료");
        }
    }
}