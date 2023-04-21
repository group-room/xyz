package com.grouproom.xyz.domain.timecapsule.entity;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserTimecapsuleId implements Serializable {

    private Long user;
    private Long timecapsule;
}
