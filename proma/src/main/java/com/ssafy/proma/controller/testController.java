package com.ssafy.proma.controller;

import com.ssafy.proma.model.entity.issue.Issue;
import io.swagger.annotations.ApiOperation;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequiredArgsConstructor
public class testController {

    @PostMapping
    @ApiOperation(value = "인덱스 페이지", notes = "로그인 전 인덱스 페이지로 모든 스터디룸 정보를 반환한다.", response = Map.class)
    public String index(@RequestBody Issue ise) {
        return "성공";
    }
}
