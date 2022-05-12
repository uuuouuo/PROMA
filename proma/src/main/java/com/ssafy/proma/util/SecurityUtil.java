package com.ssafy.proma.util;

import com.ssafy.proma.config.auth.security.PrincipalDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SecurityUtil {
    private SecurityUtil() { }

    public static String getCurrentUserNo() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null) {
            throw  new RuntimeException("Security Context 에 인증 정보가 없습니다.");
        }
        PrincipalDetails principalDetails = (PrincipalDetails) principal;
        if (principalDetails.getNo() == null) {
            throw  new RuntimeException("Security Context 에 인증 정보가 없습니다.");
        }

        return principalDetails.getNo();
    }
}
