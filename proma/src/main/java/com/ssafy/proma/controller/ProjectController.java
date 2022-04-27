package com.ssafy.proma.controller;

import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectCreateDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectDeleteDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectJoinDto;
import com.ssafy.proma.model.dto.project.ReqProjectDto.ProjectUpdateDto;
import com.ssafy.proma.service.project.ProjectService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  @ApiOperation(value = "프로젝트 수정", notes = "프로젝트 이름 수정")
  @PutMapping("/change")
  public ResponseEntity updateProject(@RequestBody ProjectUpdateDto request) {
    projectService.changeProjectName(request);
    return ResponseEntity.ok().build();
  }

  @ApiOperation(value = "프로젝트 종료", notes = "프로젝트 종료 및 삭제")
  @PutMapping("/delete")
  public ResponseEntity deleteProject(@RequestBody ProjectDeleteDto request) {
    projectService.deleteProject(request);
    return ResponseEntity.ok().build();
  }

//  @GetMapping
//  public ResponseEntity<List<ProjectNoTitleDto>> getProjectLst(){
//    projectService.getProjectList();
//  }

}
