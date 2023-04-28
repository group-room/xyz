package com.grouproom.xyz.domain.memory.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "memory_comment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemoryComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence")
    private Long sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memory_sequence")
    private Memory memory;

    @Column(length = 100, name = "content")
    private String content;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Builder
    public MemoryComment(User user, Memory memory, String content) {
        this.user = user;
        this.memory = memory;
        this.content = content;
        this.isDeleted = false;
    }

    public void updateIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}