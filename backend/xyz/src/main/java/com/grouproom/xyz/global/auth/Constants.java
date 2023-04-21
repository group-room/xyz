package com.grouproom.xyz.global.auth;

import com.grouproom.xyz.global.config.AuthConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Constants {

    public static final String[] SECURITY_WEB_EXCLUDE_URIS = {"/resources/**", "/csrf", "/error", "/swagger*/**", "favicon.ico", "/webjars/**", "/swagger-ui/**"};

    public static final String[] SECURITY_HTTP_EXCLUDE_URIS = {"/api/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**"};

    //Authorization == JWT 사용을 위함  // 해더에서 허용할 부분 설정 // CORS =  서버가 다른 origin의 브라우저에게 자신의 자원이 로드될 수 있도록 헤더에 표시해주는 방법
    public static final String[] CORS_HEADER_URIS = {"Authorization", "Refresh", "content-type"};

    // 각 소셜 로그인 폼이 있는 곳
    public static final String SECURITY_LOGIN_PROCESSING_URI = "/user/login/callback/*";

    //소셜 로그인을 하기위해서, 프론트에서 /user/login/kakao, /user/login/naver,/user/login/google로 하면 됨
    public static final String BASE_URI = "/user/login";

    //소셜 로그인이 완료되면, 프론트에 해당하는 URL로 이동하게 하여 -> 토큰을 저장할 수 있게 세팅한다. //?token=dskfajsldfasdkljdsakjl   이런식으로 토큰 값 보낼 예정
//    public static final String SECURITY_AFTER_LOGIN = "https://blahblah.site/user/login/callback";
//    public static String SECURITY_AFTER_LOGIN = "http://localhost:8080/user/login/callback";

    //소셜 로그인의 과정중에 쓰일 url, 소셜로그인 세팅과 같아야 함.
//    public static final String DEFAULT_REDIRECT_URL = "http://localhost:8081/api/user/login/callback/{registrationId}";

    public static String DEFAULT_REDIRECT_URL;

    @Autowired
    public void setDefaultRedirectUrl(AuthConfig authConfig){
        DEFAULT_REDIRECT_URL = authConfig.getServerUrl()+"/api/user/login/callback/{registrationId}";
    }


}