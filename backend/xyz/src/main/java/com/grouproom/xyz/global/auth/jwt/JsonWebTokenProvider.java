package com.grouproom.xyz.global.auth.jwt;

import com.grouproom.xyz.global.util.JwtTokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

/**
 * packageName    : com.grouproom.xyz.global.auth
 * fileName       : JsonWebTokenProvider
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : 해당 토큰 찾아서 인증객체로 변환.
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Slf4j
@Service
public class JsonWebTokenProvider {

    // token에 담겨있는 정보를 이용해 Authentication 객체를 리턴 (CustomAuthenticatedUser에서 설정한 키값과 동일해야 함.)
    public Authentication getAuthentication(String token) {

        String role = JwtTokenUtils.getClaimAttribute(token, "role");
        log.info("role : {}",role);
        Collection<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(role));
        String userSequence = JwtTokenUtils.getClaimAttribute(token, "sequence");

        CustomAuthenticatedUser customAuthenticatedUser = new CustomAuthenticatedUser(authorities, Long.valueOf(userSequence), true);
        return customAuthenticatedUser;
    }
}
