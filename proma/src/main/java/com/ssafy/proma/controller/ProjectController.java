package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectCreateDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectJoinDto;
import com.ssafy.proma.model.dto.project.ResProjectDto.ProjectNoTitleDto;
import com.ssafy.proma.service.project.ProjectService;
import java.util.List;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/project")
public class ProjectController {

  private final ProjectService projectService;

  // 프로젝트 만드는거
  @PostMapping
  public ResponseEntity createProject(@RequestBody ProjectCreateDto projectDto){

    projectService.createProject(projectDto);

    return ResponseEntity.ok().build();
  }

  // 프로젝트 들어오는거
  @PostMapping("/join")
  public ResponseEntity joinProject(@RequestBody ProjectJoinDto projectJoinDto){

    String projectNo = projectJoinDto.getProjectNo();
    projectService.joinProject(projectNo);

    return ResponseEntity.ok().build();
  }



//  @GetMapping
//  public ResponseEntity<List<ProjectNoTitleDto>> getProjectLst(){
//    projectService.getProjectList();
//  }

}
