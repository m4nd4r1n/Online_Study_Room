package com.edu.opensky.user;

import com.edu.opensky.Jwt.JwtTokenProvider;
import com.edu.opensky.Jwt.JwtUserDetailService;
import com.edu.opensky.user.dto.FindRequestDto;
import com.edu.opensky.user.dto.LoginRequestDto;
import com.edu.opensky.user.dto.RegisterRequestDto;
import com.edu.opensky.user.dto.UserUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("")
public class UserApiController {

    private final UserService userService;
    private final JwtUserDetailService jwtUserDetailService;
    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입
    @PostMapping("/auth/register")
    public String register(@RequestBody RegisterRequestDto requestDto){
        userService.register(requestDto);
        return requestDto.getImpUID();
    }

    // 로그인
    @PostMapping("/auth/login")
    public String login(@RequestBody LoginRequestDto requestDto){
        return userService.login(requestDto);
    }


    @PutMapping("/auth/update/{email}")
    public String update(
            @PathVariable String email, @RequestBody UserUpdateRequestDto requestDto){
        return userService.update(email, requestDto);
    }

    @PostMapping("/auth/find")
    public String find(@RequestBody FindRequestDto findRequestDto) {
        return userService.find(findRequestDto);
    }

    // 구현 필요
    @GetMapping("/auth/check")
    public boolean authCheck(){
        return true;
    }

    // 로그아웃
    @GetMapping("/auth/logout")
    public void logout(){
    }


}
