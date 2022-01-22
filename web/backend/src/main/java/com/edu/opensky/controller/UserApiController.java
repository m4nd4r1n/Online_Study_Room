package com.edu.opensky.controller;

import com.edu.opensky.controller.dto.*;
import com.edu.opensky.service.MenteeService;
import com.edu.opensky.service.MentorService;
import com.edu.opensky.service.ParentService;
import com.edu.opensky.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/register")
public class UserApiController {

    private final UserService userService;

    @PostMapping("/user")
    public String register(@RequestBody UserSaveRequestDto requestDto){
        return userService.register(requestDto);
    }


    @PostMapping("/api/v1/user")
    public String save(@RequestBody UserSaveRequestDto requestDto){

        return userService.register(requestDto);
    }

    @PutMapping("/api/v1/user/{username}")
    public String update(
            @PathVariable String username, @RequestBody UserUpdateRequestDto requestDto){
        return userService.update(username, requestDto);
    }

    @GetMapping("/api/v1/user/{username}")
    public UserResponseDto findByUsername (@PathVariable String username){
        return userService.findByUsername(username);
    }
}
