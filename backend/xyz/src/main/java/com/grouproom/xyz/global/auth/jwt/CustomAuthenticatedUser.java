package com.grouproom.xyz.global.auth.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * packageName    : com.grouproom.xyz.global.auth
 * fileName       : CustomAuthenticatedUser
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : 인증객체 ( Spring Security OAuth2와 연관된 필터를 거치기 위함.
 *                  OAuth2Login성공시 -> 성공 or 실패 Handler에서 컨트롤 // JWT 필터에서도 확인
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Getter
@Setter
public class CustomAuthenticatedUser extends AbstractAuthenticationToken {

    private Long userSeqence;

    public CustomAuthenticatedUser(Collection<? extends GrantedAuthority> authorities, Long userSeqence, boolean isAuthenticated) {
        super(authorities);
        this.setAuthenticated(isAuthenticated);
        this.userSeqence = userSeqence;
    }


    public Map<String, Object> objToMap() {
        Map<String, Object> attributes = new HashMap<>();

        attributes.put("userSeqence", userSeqence);
        attributes.put("role", this.getAuthorities().stream()
                .findFirst()
                .orElseGet(() -> new SimpleGrantedAuthority("ROLE_USER"))
                .getAuthority());

        return attributes;
    }

    public static CustomAuthenticatedUser mapToObj(Map<String, Object> attributes) {
        return new CustomAuthenticatedUser(Collections.singleton(new SimpleGrantedAuthority(String.valueOf(attributes.get("role")))),
                Long.valueOf(attributes.get("userSeqence").toString()),
                true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return this.userSeqence;
    }

    public String getRole() {
        return this.getAuthorities().stream()
                .findFirst()
                .orElseGet(() -> new SimpleGrantedAuthority("ROLE_USER"))
                .getAuthority();
    }
}