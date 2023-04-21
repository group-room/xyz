package com.grouproom.xyz.global.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

/**
 * packageName    : com.grouproom.xyz.global.auth
 * fileName       : AuthConfig
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : application.yml에 존재하는 소셜 로그인 관련 key를 읽어온다.
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "auth")
@Getter
@Setter
public class AuthConfig {

    private String serverUrl;

    private String redirectUrl;

    private Map<String, Credentials> credentials;
}