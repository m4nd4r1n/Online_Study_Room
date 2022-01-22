package com.edu.opensky.controller;

import com.edu.opensky.controller.dto.UserResponseDto;
import com.edu.opensky.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class UserController {

    UserService userService;

    @PostMapping("/login")
    public String login(UserResponseDto responseDto){
        return "redirect:/";
    }

    @GetMapping("/user/save")
    public String userSave(){
        return "join";
    }


}
