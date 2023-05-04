//package com.grouproom.xyz.global.config.kafka;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.*;
//
//@RequiredArgsConstructor
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer  {
//
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        // chat client will use this to connect to the server
//            registry.addEndpoint("/chat").setAllowedOrigins("*").withSockJS();
//    }
//
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry registry) {
//        registry.setApplicationDestinationPrefixes("/kafka");
//        registry.enableSimpleBroker("/topic");
//    }
//
//}
