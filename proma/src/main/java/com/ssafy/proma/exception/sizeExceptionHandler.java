package com.ssafy.proma.exception;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@Component
@ControllerAdvice
public class sizeExceptionHandler {

    @ExceptionHandler(SizeLimitExceededException.class)
    public ResponseEntity handleSizeLimitExceededException(SizeLimitExceededException ex) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        resultMap.put("message", Message.USER_IMAGE_SIZE_ERROR_MESSAGE);
        return new ResponseEntity(resultMap, status);
    }

}
