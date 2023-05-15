package com.grouproom.chat.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.DefaultLoginPageConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.RequestCacheConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * packageName    : com.grouproom.xyz.global.config
 * fileName       : SecurityConfig
 * author         : SSAFY
 * date           : 2023-04-20
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Configuration
@EnableWebSecurity(debug = false)
@RequiredArgsConstructor
public class SecurityConfig {


    // (0)[Constants] SECURITY_WEB_EXCLUDE_URIS에 설정한 url들은 스프링 시큐리티를 적용하지 않는다.
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .antMatchers("/**");
    }

    //(1) CORS 세팅 부분 (CORS_HEADER_URIS에서 세팅한 값들은 CORS를 허용한다)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();


        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://xyz-gen.com", "https://www.xyz-gen.com", "http://localhost:5500"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Sequence", "Nickname", "Image"));
        configuration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origin", "Content-Type", "Accept",
                "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods",
                "Access-Control-Allow-Origin", "Access-Control-Expose-Headers", "Access-Control-Max-Age",
                "Access-Control-Request-Headers", "Access-Control-Request-Method", "Age", "Allow", "Alternates",
                "Content-Range", "Content-Disposition", "Content-Description"));
        configuration.setMaxAge(60L);


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //(1) CORS 설정
        http.cors().configurationSource(corsConfigurationSource());

        //기본 설정 해제와 경로 설정
        http
                .csrf(AbstractHttpConfigurer::disable)                                                            //Cross Site Request Forgery 설정 해제
                .formLogin(FormLoginConfigurer::disable)                                                        //Login Form 페이지 설정 해제
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))    //세션 정책 : 스프링 시큐리티가 생성하지도 않고 존재해도 사용하지 않음(JWT 같은토큰방식을 쓸때 사용하는 설정 )
                .requestCache(RequestCacheConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                                .antMatchers("/**").permitAll()                            //(0)[Constants] SECURITY_HTTP_EXCLUDE_URIS 권한 허용
//                                .anyRequest().authenticated()                                                            //개발 끝나면 나머지 URL은 권한 필요
                                .anyRequest().permitAll()                                                            //개발 중에는 임시로 모든 요청 허용
                )
        ;

        //로그인 페이지 Disable
        http.getConfigurer(DefaultLoginPageConfigurer.class).disable();

        return http.build();
    }


}
