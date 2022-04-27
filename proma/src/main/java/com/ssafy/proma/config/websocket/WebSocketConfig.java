package com.ssafy.proma.config.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WebsocketHandler websocketHandler;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        registry.setApplicationDestinationPrefixes("/pub"); //client에서 SEND 요청 처리
        registry.enableSimpleBroker("/sub", "/queue"); //해당 경로로 SimpleBroker 등록, SimpleBroker는 해당 경로를 구독하는 client에게 메시지를 전달

//        registry.enableSimpleBroker("/topic","/queue");
//        /topic은 1:N의 일대다의 구독방식을 가지고 있고, /queue는 1:1구독방식으로 일대일 메세지 전달을 할때 사용된다.
//        즉 다수에게 메세지를 보낼때는 '/topic/주소', 특정대상에게 메세지를 보낼 때는 '/queue/주소'의 방식을 택하게 된다.
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp") // WebSocket 또는 SockJS Client가 웹소켓 핸드셰이크 커넥션을 생성할 경로
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(websocketHandler);
    }

}