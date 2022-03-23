package com.edu.opensky.service.jwt;

import com.edu.opensky.domain.User;
import com.edu.opensky.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class JwtUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    // 상세정보를 조회하는 메소드 , 사용자의 계정정보와 권한을 갖는 UserDetails인터페이스를 반환한다.
    // 매개변수는 로그인시 입력한 아이디
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // DB에서 사용자정보를 가져와서 User객체에 넣어서 반환
        Optional<User> user1= userRepository.findByEmail(email);

        if(user1 == null){
            throw new UsernameNotFoundException(email);
        }
        return org.springframework.security.core.userdetails.User.builder()
                .username(user1.get().getEmail())
                .password(user1.get().getPassword())
                .build();

    }

}
