package com.ssafy.proma.service.chat;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ChatServiceTest {

  @Test
  void TimeCheck() throws Exception {

    ZoneId zoneId = ZoneId.of("Asia/Seoul");
    ZonedDateTime zonedDateTime = ZonedDateTime.now(zoneId);
    DateTimeFormatter formatter = DateTimeFormatter
        .ofLocalizedDateTime(FormatStyle.FULL)
        .withLocale(Locale.KOREA);
    String time = zonedDateTime.format(formatter);
    String strTime = zonedDateTime.toString();
    System.out.println(time);
    System.out.println(strTime);

    LocalDateTime ldTime = LocalDateTime.now();
    System.out.println(ldTime.toString());

    }
}
