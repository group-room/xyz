package com.grouproom.xyz.domain.memory.entity;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@IdClass(UserMemoryID.class)
@Table(name = "memory_like")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemoryLike extends BaseTimeEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memory_sequence")
    private Memory memory;

    @Column(name = "is_selected", columnDefinition = "tinyint(1) default 1")
    private Boolean isSelected;
}
