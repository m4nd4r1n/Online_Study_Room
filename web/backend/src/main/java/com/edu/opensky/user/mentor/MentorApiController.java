package com.edu.opensky.user.mentor;

import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import com.edu.opensky.user.mentor.dto.MenteeListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mentor")
public class MentorApiController {

    private final MentorService mentorService;
    private final UserService userService;

    @GetMapping("/menteeList")
    public List<MenteeListDto> getMenteeList(ServletRequest request){
        userService.check(request);
        Object principal= SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user= userService.getUserByToken(principal);
        return mentorService.getMenteeList(user.getEmail());
        // 멘티 아이디 리스트 반환
//        String id= "asdasd@naver.com";
//        return mentorService.getMenteeList(id);

    }


}
