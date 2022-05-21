package com.edu.opensky.user.mentor;

import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mentor")
public class MentorApiController {

    private final MentorService mentorService;
    private final UserService userService;

    @GetMapping("/menteeList")
    public ResponseEntity getMenteeList(@CookieValue(value="Authorization")String token){
        User user= userService.getUserByToken(token);
        System.out.println("user.getEmail() = " + user.getEmail());
        return ResponseEntity.ok(mentorService.getMyNameAndMenteeList(user.getEmail()));
    }


}
