package com.ssafy.proma.service.sprint;

import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto;
import com.ssafy.proma.model.dto.sprint.ReqSprintDto.SprintCreateDto.SprintUpdateDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SprintServiceTest {

  @Autowired
  private SprintService sprintService;

  @Test
  void createSprint() {

    // given
    SprintCreateDto sprintCreateDto =
        new SprintCreateDto("2주차","2022-04-26","2022-05-03","1");

    // when
    sprintService.createSprint(sprintCreateDto);
    // then

  }

  @Test
  void startSprint() {

    sprintService.startSprint(1);

  }

  @Test
  void updateSprint() {

    SprintUpdateDto sprintUpdateDto = new SprintUpdateDto("1주차","2022-04-26","2022-04-19");

    sprintService.updateSprint(1,sprintUpdateDto);

  }

}