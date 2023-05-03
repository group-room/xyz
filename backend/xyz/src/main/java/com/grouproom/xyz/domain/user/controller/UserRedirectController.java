package com.grouproom.xyz.domain.user.controller;

import com.grouproom.xyz.global.config.AuthConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * packageName    : com.grouproom.xyz.domain.user.controller
 * fileName       : UserRedirectController
 * author         : SSAFY
 * date           : 2023-05-03
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-03        SSAFY       최초 생성
 */
@Slf4j
@Controller
@RequestMapping("/login")
@RequiredArgsConstructor
public class UserRedirectController {

    private final AuthConfig authConfig;

    @GetMapping("/store-and-redirect")
    public String storeAndRedirect(String authorization,HttpServletRequest request, HttpServletResponse response, Model model) {

//        model.addAttribute("Authorization",response);
        model.addAttribute("Authorization",authorization);
        model.addAttribute("Url",authConfig.getRedirectUrl());
        return "store_and_redirect";
    }
}
