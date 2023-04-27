package com.grouproom.xyz.global.util;

import com.grouproom.xyz.global.auth.jwt.JsonWebToken;
import com.grouproom.xyz.global.exception.ErrorResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
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

    //배포용 access 토큰 30분
    //public static final long ACCESS_PERIOD = 1000L * 60L * 30L;
    //개발용 access 토큰 30일
    public static final long ACCESS_PERIOD = 1000L * 60L * 60L * 24L * 30L;

    // refresh 토큰 하루 (보통 2주)
    public static final long REFRESH_PERIOD = 1000L * 60L * 60L * 24L;

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
    public static boolean isValidToken(String token) {
        return getClaims(token)
                .getExpiration()
                .after(new Date());
    }

    public static String resolveAccessToken(HttpServletRequest req) throws RuntimeException {
        String accessToken = req.getHeader("Authorization");
        if (accessToken == null) {
            throw new ErrorResponse(HttpStatus.FORBIDDEN, "토큰이 담겨있지 않습니다.");
        }
        return accessToken;

    }

}