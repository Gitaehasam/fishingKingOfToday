package com.ssafy.sub.pjt.domain;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_MEMBER_ID;

import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.exception.AuthException;
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
            return loginService.createUser(providerName, socialId, nickname, imageUrl);
        }
    }

    public User findBySocialId(String id) throws Exception {
        return userRepository
                .findBySocialId(id)
                .orElseThrow(() -> new AuthException(NOT_FOUND_MEMBER_ID));
    }

    //    public void isExistUser(String socialId) {
    //        boolean isExist = ;
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
