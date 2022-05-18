package com.ssafy.proma.service.project;

import com.ssafy.proma.model.dto.project.MailDto;
import com.ssafy.proma.repository.project.ProjectRepository;
import com.ssafy.proma.util.MailHandler;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Async
@AllArgsConstructor
public class MailService {

  private JavaMailSender mailSender;
  private static final String FROM_ADDRESS = "proma@ssafy.com";

  public void mailSend(List<String> inviteMails, String projectNo, String nickname,String projectName) {

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
        String htmlContent = "<html>\n"
            + "<div style=\"background-color:#6667AB; width:900px; height:250px; padding:20px 30px 20px 30px;\">\n"
            + "  <div>\n"
            + "      <img src=\"https://lab.ssafy.com/s06-final/S06P31C107/uploads/78a28a316b960a95f0c674295ec0c84e/logo.png\" style=\"width:150px;\" />\n"
            + "  </div>\n"
            + "  \n"
            + "  <div style=\"text-align: -webkit-center;\">\n"
            + "      <h1 style=\"color:#fff; font-size:30px; font-family:Arial; text-align-last: center;\">당신을 PROMA에 초대합니다</h1>\n"
            + "    <div style=\"color:#333333\">\n"
            + "      <b>"+nickname+"</b>님이 <a style=\"text-decoration:none; color: white\" href=\"https://k6c107.p.ssafy.io/project/"+projectNo+"\">"+projectName+"</a> 페이지에 초대했습니다.\n"
            + "    </div>\n"
            + "\n"
            + "    <div style=\"color:#333333;margin-top:30px\">\n"
            +"       <a href=\"https://k6c107.p.ssafy.io/project/"+projectNo+"\">"
            + "      <button style=\"border: none; display:inline-block; width:150px; padding:10px 10px 10px 10px; background: #cf9687; border-radius:3px; font-family: sans-serif; box-shadow:0 15px 35px rgba(0, 0, 0, 0.2); font-weight:600; transition:0.25s;  color: white;\" type=\"button\" onclick=\"location.href=\"https://k6c107.p.ssafy.io/project/"+projectNo+"\">\n"
            + "        참여하기\n"
            + "    </button>\n"
            + "    </div>\n"
            + "  </div>\n"
            + "</div>\n"
            + "</html>";
//      String htmlContent = "<p>" + mailDto.getMessage();
        mailHandler.setText(htmlContent, true);

        mailHandler.send();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
