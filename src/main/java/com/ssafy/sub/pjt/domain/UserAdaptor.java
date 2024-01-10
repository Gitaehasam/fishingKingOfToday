package com.ssafy.sub.pjt.domain;

import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.exception.UserNotFoundException;
import com.ssafy.sub.pjt.service.LoginService;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserAdaptor {

    private final UserRepository userRepository;
    private final LoginService loginService;

    public UserAdaptor(UserRepository userRepository, LoginService loginService) {
        this.userRepository = userRepository;
        this.loginService = loginService;
    }

    public User authUser(String socialId, String nickname, String imageUrl, String providerName) {
        Optional<User> findUser = null;
        findUser = userRepository.findBySocialId(socialId);

        if (findUser.isPresent()) {
            return loginService.login(providerName, findUser.get().getSocialId());
        } else {
            return loginService.createUser(socialId, nickname, imageUrl);
        }
    }

    public User findBySocialId(String id) throws Exception {
        return userRepository.findBySocialId(id).orElseThrow(() -> UserNotFoundException.EXCEPTION);
    }

    //    public void isExistUser(String socialId) {
    //        boolean isExist = false;
    //        try {
    //            isExist = userRepository.existsBySocialId(socialId);
    //        } catch (SQLException e) {
    //            e.printStackTrace();
    //        }
    //
    //        if (!isExist) {
    //            throw UserNotFoundException.EXCEPTION;
    //        }
    //    }
}
