package com.grouproom.xyz.domain.chat.service;

import com.grouproom.xyz.domain.chat.dto.request.LoginUserRequest;
import com.grouproom.xyz.domain.chat.dto.request.PostMessageRequest;
import com.grouproom.xyz.domain.chat.dto.request.RegisterUserRequest;
import com.grouproom.xyz.domain.chat.dto.response.*;
import com.grouproom.xyz.domain.chat.entity.ChatUser;
import com.grouproom.xyz.domain.chat.repository.ChatUserRepository;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.Random;
import java.util.logging.Logger;


@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final Logger logger = Logger.getLogger("com.grouproom.xyz.domain.chat.service.ChatServiceImpl");
    private final ChatUserRepository chatUserRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final String emailDomain = "@xyz.com";
    private final String baseUrl = "http://localhost:3000/api/v1";

    @Transactional
    @Override
    public ResponseEntity addChatUser(Long userSeq, String nickname, String identify) {

        logger.info("addChatUser 호출");
        String userName = identify.replace("#", "");
        String random = String.format("%s", new Random().nextInt() + 'a');
        String email = new StringBuilder().append(identify).append(emailDomain).toString();
        String pass = new StringBuilder().append(identify).append(random).toString();
        RegisterUserRequest registerUserRequest = RegisterUserRequest.builder()
                .username(userName)
                .email(email)
                .pass(pass)
                .name(nickname)
                .build();
        logger.info("email : " + email + ", pass : " + pass);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        HttpEntity<RegisterUserRequest> entity = new HttpEntity<>(registerUserRequest, headers);

        String url = new StringBuilder().append(baseUrl).append("/users.register").toString();

        ResponseEntity<RegisterUserResponse> response = restTemplate.exchange(url, HttpMethod.POST, entity, RegisterUserResponse.class);
        logger.info("success? " + response.getBody().getSuccess());
        if (response.getBody().getSuccess().equals("true")) {
            RegisterUser user = response.getBody().getUser();
            ChatUser chatUser = ChatUser.builder()
                    .userSequence(userRepository.findBySequence(userSeq))
                    .username(user.getUsername())
                    .email(registerUserRequest.getEmail())
                    .password(registerUserRequest.getPass())
                    .userId(user.get_id())
                    .build();
            chatUserRepository.save(chatUser);
        } else {
            logger.severe("채팅 회원가입 실패");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "채팅 회원가입 실패");
        }
        return response;
    }

    @Transactional
    @Override
    public ResponseEntity modifyChatUserToLogin(Long userSeq, LoginUserRequest loginUserRequest) {

        logger.info("modifyChatUserToLogin 호출");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        HttpEntity<LoginUserRequest> entity = new HttpEntity<>(loginUserRequest, headers);

        String url = new StringBuilder().append(baseUrl).append("/login").toString();

        ResponseEntity<LoginUserResponse> response = restTemplate.exchange(url, HttpMethod.POST, entity, LoginUserResponse.class);
        logger.info("success? " + response.getBody().getStatus());
        if (response.getBody().getStatus().equals("success")) {
            LoginUser loginUser = response.getBody().getUser();
            ChatUser chatUser = chatUserRepository.findByUserSequence_Sequence(userSeq);
            chatUser.setAuthToken(loginUser.getAuthToken());
        } else {
            logger.severe("채팅 로그인 실패");
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "채팅 로그인 실패");
        }
        return response;
    }

    @Override
    public ResponseEntity addMessageToChannel(Long userSeq, PostMessageRequest postMessageRequest) {

        logger.info("addMessageToChannel 호출");
        ChatUser me = chatUserRepository.findByUserSequence_Sequence(userSeq);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("X-Auth-Token", me.getAuthToken());
        headers.add("X-User-Id", me.getUserId());
        HttpEntity<PostMessageRequest> entity = new HttpEntity<>(postMessageRequest, headers);

        String url = new StringBuilder().append(baseUrl).append("/chat.postMessage").toString();

        ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.POST, entity, PostMessageRequest.class); // 반환 타입 수정 필요
        return null;
    }

    @Override
    public ChannelsAndImsResponse findChannelAndIm(Long userSeq) {
        ChannelsAndImsResponse channelsAndImsResponse = new ChannelsAndImsResponse();
        channelsAndImsResponse.setChannels(findChannel(userSeq));
        channelsAndImsResponse.setIms(findIm(userSeq));
        return channelsAndImsResponse;
    }

    @Override
    public ChannelsResponse findChannel(Long userSeq) {

        logger.info("findChannel 호출");
        ChatUser me = chatUserRepository.findByUserSequence_Sequence(userSeq);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("X-Auth-Token", me.getAuthToken());
        headers.add("X-User-Id", me.getUserId());
        HttpEntity entity = new HttpEntity<>(headers);

        String url = new StringBuilder().append(baseUrl).append("/channels.list.joined").toString();

        ResponseEntity<ChannelsResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, ChannelsResponse.class);
        return response.getBody();
    }

    @Override
    public ImsResponse findIm(Long userSeq) {
        logger.info("findIm 호출");
        ChatUser me = chatUserRepository.findByUserSequence_Sequence(userSeq);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        headers.add("X-Auth-Token", me.getAuthToken());
        headers.add("X-User-Id", me.getUserId());
        HttpEntity entity = new HttpEntity<>(headers);

        String url = new StringBuilder().append(baseUrl).append("/im.list").toString();

        ResponseEntity<ImsResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, ImsResponse.class);
        return response.getBody();
    }

}
