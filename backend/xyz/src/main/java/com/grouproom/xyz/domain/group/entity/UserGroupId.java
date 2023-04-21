package com.grouproom.xyz.domain.group.entity;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserGroupId implements Serializable {

    private Long user;
    private Long groupe;
}
