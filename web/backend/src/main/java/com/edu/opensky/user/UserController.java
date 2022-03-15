package com.edu.opensky.user;

import com.edu.opensky.user.dto.LoginRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class UserController {

    UserService userService;

    @PostMapping("/login123")
    public String login(LoginRequestDto responseDto){
        return "redirect:/";
    }

    @GetMapping("/user/save")
    public String userSave(){
        return "join";
    }


}
