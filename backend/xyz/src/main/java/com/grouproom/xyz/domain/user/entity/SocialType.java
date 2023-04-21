package com.grouproom.xyz.domain.user.entity;

public enum SocialType {
    KAKAO("kakao"),
    GOOGLE("google"),
    NAVER("naver");

    private final String label;

    SocialType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
