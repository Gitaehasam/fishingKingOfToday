package com.ssafy.sub.pjt.config.security;

import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.domain.UserAdaptor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserAdaptor userAdaptor;

    public CustomUserDetailService(UserAdaptor userAdaptor) {
        this.userAdaptor = userAdaptor;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User account = null;
        try {
            account = userAdaptor.findBySocialId(id);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new CustomUserDetails(account);
    }
}
