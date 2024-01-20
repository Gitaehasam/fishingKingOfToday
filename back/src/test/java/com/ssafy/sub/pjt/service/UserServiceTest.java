package com.ssafy.sub.pjt.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.ssafy.sub.pjt.common.UserFactory;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks private UserService userService;

    @Mock private UserRepository userRepository;

    @Test
    @DisplayName("개인 정보 수정")
    public void testUpdateMyPageInfo() {

        // given
        when(userRepository.findById(anyInt()))
                .thenReturn(Optional.ofNullable(UserFactory.mockUser()));

        // when
        userService.updateMyPageInfo(anyInt(), UserFactory.mockMyPageRequest());

        // then
        verify(userRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("회원 탈퇴")
    public void testDeleteAccount() {

        // when
        userService.deleteAccount(anyString());

        // then
        verify(userRepository, times(1)).deleteBySocialId(any());
    }
}
