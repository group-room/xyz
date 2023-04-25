package com.grouproom.xyz.domain.user.service;

import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : com.grouproom.xyz.domain.user.service
 * fileName       : UserServiceImpl
 * author         : SSAFY
 * date           : 2023-04-25
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-25        SSAFY       최초 생성
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;


    @Override
    @Transactional
    public void removeUser(Long userSequence) {
        User user = userRepository.findBySequence(userSequence);
        user.changeIsDeleted(true);
    }
}
