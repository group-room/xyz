package com.grouproom.xyz.domain.user.entity;

import lombok.*;

import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * packageName    : com.grouproom.xyz.domain.user.entity
 * fileName       : UserModifierID
 * author         : SSAFY
 * date           : 2023-04-19
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-19        SSAFY       최초 생성
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
public class UserModifierID implements Serializable {
    private Long user;

    private Long modifier;
}
