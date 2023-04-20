package com.grouproom.xyz.domain.friend.entity;

import lombok.*;

import java.io.Serializable;

/**
 * packageName    : com.grouproom.xyz.domain.friend.entity
 * fileName       : FriendID
 * author         : SSAFY
 * date           : 2023-04-20
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-20        SSAFY       최초 생성
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
public class FriendID implements Serializable {

    private Long fromUser;

    private Long toUser;
}
