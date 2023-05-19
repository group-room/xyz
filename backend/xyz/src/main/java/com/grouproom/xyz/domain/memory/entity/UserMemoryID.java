package com.grouproom.xyz.domain.memory.entity;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UserMemoryID implements Serializable {

    private Long user;
    private Long memory;
}
