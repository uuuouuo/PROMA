package com.ssafy.proma.controller;

import io.swagger.annotations.ApiOperation;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import com.ssafy.proma.model.entity.issue.Issue;
@RestController
@RequiredArgsConstructor
public class testController {
    @PostMapping
    @ApiOperation(value = "인덱스 페이지", notes = "로그인 전 인덱스 페이지로 모든 스터디룸 정보를 반환한다.", response = Map.class)
    public String index(@RequestBody Issue ise) {
        return "성공";
    }
}
