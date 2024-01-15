package com.ssafy.sub.pjt.util;

import com.ssafy.sub.pjt.config.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationUtil {
    public static String getCurrentUserSocialId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails currentUser = (CustomUserDetails) principal;
        return currentUser.getUsername();
    }
}
