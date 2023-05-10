package com.grouproom.xyz.global.util;

import com.grouproom.xyz.global.auth.jwt.JsonWebToken;
import com.grouproom.xyz.global.exception.ErrorResponse;
import io.jsonwebtoken.*;
import org.springframework.http.HttpStatus;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

/**
 * packageName    : com.grouproom.xyz.global.util
 * fileName       : JwtTokenUtils
 * author         : SSAFY
 * date           : 2023-04-20
 * description    : Json Web Token을 관리하는 객체
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
public class JwtTokenUtils {

    //우리 프로젝트 만의 시크릿 키
    private static final String SECRET_KEY = Base64.getEncoder().encodeToString("xyz-jwt-secret-key".getBytes());

//    // access 토큰 1시간 실제
//    public static final long ACCESS_PERIOD = 1000L * 60L * 60L * 1L;

    // access 토큰 5일 개발용
    public static final long ACCESS_PERIOD = 1000L * 60L * 60L * 24L * 5L;

    // refresh 토큰 보통 2주
    public static final long REFRESH_PERIOD = 1000L * 60L * 60L * 24L * 2L;

    //userSequence & role 토큰 발급
    public static JsonWebToken allocateToken(Long userSequence, String role) throws RuntimeException {
        try {
            JwtBuilder jwtBuilder = Jwts.builder()
                    .setHeaderParam("alg", "HS256")
                    .setHeaderParam("typ", "JWT");

            jwtBuilder.claim("sequence", userSequence);                                    //JWT의 body
            jwtBuilder.claim("role", role);                                          //JWT의 body

            Date now = new Date();
            return new JsonWebToken(
                    jwtBuilder.setIssuedAt(now)
                            .setExpiration(new Date(now.getTime() + ACCESS_PERIOD))
                            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)                //암호화. JWT에는 권한까지 되어있기 때문에 중요.
                            .compact(),
                    jwtBuilder.setIssuedAt(now)
                            .setExpiration(new Date(now.getTime() + REFRESH_PERIOD))        //암호화. JWT에는 권한까지 되어있기 때문에 중요.
                            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                            .compact()
            );
        } catch (Exception e) {
            throw new ErrorResponse(HttpStatus.FORBIDDEN, "잘못된 토큰입니다.");
        }
    }

    public static String changeAccessToken(Long userSequence, String role) throws RuntimeException {
        try {
            JwtBuilder jwtBuilder = Jwts.builder()
                    .setHeaderParam("alg", "HS256")
                    .setHeaderParam("typ", "JWT");

            jwtBuilder.claim("sequence", userSequence);                                    //JWT의 body
            jwtBuilder.claim("role", role);                                          //JWT의 body

            Date now = new Date();
            return jwtBuilder.setIssuedAt(now)
                    .setExpiration(new Date(now.getTime() + ACCESS_PERIOD))
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY)                //암호화. JWT에는 권한까지 되어있기 때문에 중요.
                    .compact();
        } catch (Exception e) {
            throw new ErrorResponse(HttpStatus.FORBIDDEN, "잘못된 토큰입니다.");
        }
    }

    public static Claims getClaims(String token) throws RuntimeException {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            throw new ErrorResponse(HttpStatus.FORBIDDEN, "잘못된 토큰입니다.(2)");
        }
    }

    public static String getClaimAttribute(String token, String key) throws RuntimeException {
        return getClaims(token).getOrDefault(key, null).toString();
    }

    //토큰 유효 시간 검사
    public static boolean isValidToken(String token) {//throws RuntimeException
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            if (Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getExpiration().before(new Date())) {
                return false;
            } else {
                return true;
            }
        } catch (ExpiredJwtException e) {
            return false;
        } catch (Exception e) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST, "잘못된 토큰입니다.");
        }
    }

    public static String resolveAccessToken(HttpServletRequest req) throws RuntimeException {

        String accessToken = req.getHeader("Authorization");
        if (accessToken == null) throw new ErrorResponse(HttpStatus.FORBIDDEN, "로그인 되어 있지 않습니다.");

        return accessToken;

//        Cookie[] cookies = req.getCookies();
//        Cookie accessToken = Arrays.stream(cookies)
//                .filter(c -> c.getName().equals("access"))
//                .findAny()
//                .orElseThrow( () -> new ErrorResponse(HttpStatus.FORBIDDEN, "로그인 되어 있지 않습니다."));
//
//        return accessToken.getValue();
    }

    public static String resolveRefreshToken(HttpServletRequest req) throws RuntimeException {
        Cookie[] cookies = req.getCookies();
        if(null == cookies) return null;
        Cookie accessToken = Arrays.stream(cookies)
                .filter(c -> c.getName().equals("Refresh"))
                .findAny()
                .orElse(new Cookie("void", null));

        return accessToken.getValue();
    }
}