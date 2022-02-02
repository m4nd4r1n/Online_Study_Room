package com.edu.opensky.controller.api;

import com.edu.opensky.controller.dto.UserResponseDto;
import com.edu.opensky.controller.dto.UserSaveRequestDto;
import com.edu.opensky.controller.dto.UserUpdateRequestDto;
import com.edu.opensky.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("")
public class UserApiController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/auth/register")
    public String register(@RequestBody UserSaveRequestDto requestDto){
        return userService.register(requestDto);
    }

    // 로그인
    @PostMapping("/auth/login")
    public String login(@RequestBody UserResponseDto responseDto){
        return userService.login(responseDto);
    }

    // 아임포트 인증
    @PostMapping("/certifications")
    public void certification(@RequestBody UserResponseDto responseDto){

    }

    // 토큰
    @PostMapping("/token")
    public void token(){
        userService.getToken();
    }
    @PutMapping("/api/v1/user/{username}")
    public String update(
            @PathVariable String username, @RequestBody UserUpdateRequestDto requestDto){
        return userService.update(username, requestDto);
    }

    /*@GetMapping("/api/v1/user/{username}")
    public UserResponseDto findByUsername (@PathVariable String username){
        return userService.findByEmail(username);
    }*/
}
