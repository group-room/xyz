package com.grouproom.xyz.domain.chat.entity;

import com.grouproom.xyz.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@AllArgsConstructor
@Setter
public class ChatUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sequence;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User userSequence;

    @Column(name = "username", length = 30)
    private String username;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "password", length = 20)
    private String password;

    @Column(name = "user_id", length = 50)
    private String userId;

    @Column(name = "auth_token", length = 500)
    private String authToken;

}
