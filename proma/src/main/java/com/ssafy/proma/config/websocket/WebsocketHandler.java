package com.ssafy.proma.config.websocket;

import com.ssafy.proma.config.auth.jwt.JwtProperties;
import com.ssafy.proma.config.auth.jwt.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WebsocketHandler implements ChannelInterceptor {

  private final JwtTokenService jwtTokenService;

  // websocket을 통해 들어온 요청이 처리 되기전 실행
  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
    // websocket 연결시 헤더의 jwt token 검증
    if (StompCommand.CONNECT == accessor.getCommand()) {
      jwtTokenService.validate(accessor.getFirstNativeHeader(JwtProperties.JWT_HEADER_STRING));
    }
    return message;
  }


}
