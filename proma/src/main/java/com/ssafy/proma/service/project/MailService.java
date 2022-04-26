package com.ssafy.proma.service.project;

import com.ssafy.proma.model.dto.project.MailDto;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.util.MailHandler;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailService {

  private JavaMailSender mailSender;
  private static final String FROM_ADDRESS = "proma@ssafy.com";

  public void mailSend(List<String> inviteMails, String projectNo, String nickname) {

    try {

      for(String address : inviteMails){


        MailHandler mailHandler = new MailHandler(mailSender);
        // 받는 사람
        mailHandler.setTo(address);
        // 보내는 사람
        mailHandler.setFrom(MailService.FROM_ADDRESS);
        // 제목
        mailHandler.setSubject(nickname + "님이 귀하를 project에 초대했습니다.");
        // HTML Layout
        String htmlContent = "<h1 style=\"color:#333;font-size:20px\">초대</h1>";
        htmlContent += "<div style=\"color:#333333\"><div style=\"color:#333333\"><b>"+nickname+"</b>님이 <a href=\"localhost:3000/"+projectNo+"\">일지</a> 페이지에 초대했습니다.</div><div style=\"color:#333333;margin-top:16px\"><a href=\"localhost:3000/" +projectNo+"\"><b>여기를 클릭하여 확인하세요.</b></a></div></div>";

//      String htmlContent = "<p>" + mailDto.getMessage();
        mailHandler.setText(htmlContent, true);

        mailHandler.send();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
