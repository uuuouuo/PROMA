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
import com.ssafy.proma.repository.user.UserRepository;
import com.ssafy.proma.service.topic.TopicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
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
    private final UserRepository userRepository;

    @Override
    public Map<String, Object> getNotificationList(String userNo) throws Exception {

        Map<String, Object> resultMap = new HashMap<>();
        List<Notification> notifications = notificationRepository.findByUserNoAndCheckedFalseOrderByNotificationTimeDesc(userNo);

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
    public void sendSprintNotification(Sprint sprint) throws Exception {

        //SprintService startSprint에서 notificationService.sendSprintNotification(sprint);

        String message = sprint.getProject().getName() + "\n"
                + "스프린트 " +sprint.getName() + " 가 " + (sprint.getStatus() == 1 ? "시작" : "종료") + "되었습니다.";
        log.debug(message);

        List<UserProject> userProjectList = userProjectRepository.findByProject(sprint.getProject());
        for(UserProject project : userProjectList){

            //알림 저장 & 전송
            User user = project.getUser();
            Notification notification = Notification.builder().user(user).message(message).build();

            notificationRepository.save(notification);
            NotificationDto notificationDto = new NotificationDto(notification.getNo(), notification.getMessage(), notification.isChecked(), notification.getNotificationTime());
            messagingTemplate.convertAndSend("/queue/notification/" + user.getNo(), notificationDto);

            log.debug(user.getNickname() + " 알림 전송 완료");
        }
    }

    @Override
    @Transactional
    public void sendTopicNotification(Issue issue) throws Exception {

        //IssueService changeStatusIssue에서 notificationService.sendTopicNotification(issue);

        Topic topic = issue.getTopic(); //이슈는 무조건 토픽 가짐!

        String message =  topic.getProject().getName() + "\n"
                + "토픽 " + topic.getTitle() + " 의 이슈 " +  issue.getTitle() + " 이/가 완료되었습니다.";
        log.debug(message);

        List<Issue> issueList = issueRepository.findByTopic(topic).get();
//        for(Issue relatedIssue : issueList){
//
//            notificationRepository.save(Notification.builder().user(relatedIssue.getUser()).message(message).build());
//            NotificationDto notification = new NotificationDto();
//            notification.setMessage(message);
//            messagingTemplate.convertAndSend("/queue/notification/" + relatedIssue.getUser().getNo(), notification);
//
//            log.debug(relatedIssue.getUser().getNickname() + " 알림 전송 완료");
//        }

        //중복 수신 제거!
        Set<User> userList = issueList.stream().map(Issue::getUser).collect(Collectors.toSet());

        for(User user : userList) {

            Notification notification = Notification.builder().user(user).message(message).build();
            notificationRepository.save(notification);

            NotificationDto notificationDto = new NotificationDto(notification.getNo(), notification.getMessage(), notification.isChecked(), notification.getNotificationTime());
            messagingTemplate.convertAndSend("/queue/notification/" + user.getNo(), notificationDto);

            log.debug(user.getNickname() + " 알림 전송 완료");
        }
    }

    @Override
    @Transactional
    public Map<String, Object> sendNotification(String userNo) throws Exception {

        Map<String, Object> resultMap = new HashMap<>();

        Optional<User> userOp = userRepository.findById(userNo);
        if(!userOp.isPresent()){
            resultMap.put("message", "존재하지 않는 회원입니다.");
            return resultMap;
        }

        String message = userNo + "님 임시 알림 왔음";
        Notification notification = Notification.builder().user(userOp.get()).message(message).build();
        notificationRepository.save(notification);

        //알림 전송
        NotificationDto notificationDto = new NotificationDto(notification.getNo(), notification.getMessage(), notification.isChecked(), notification.getNotificationTime());
        messagingTemplate.convertAndSend("/queue/notification/" + userNo, notificationDto);

        resultMap.put("message", "알림 전송 성공");
        return resultMap;
    }
}