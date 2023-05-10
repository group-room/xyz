package com.grouproom.xyz.domain.tc.entity;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserTcId implements Serializable {

    private Long user;
    private Long tc;
}
