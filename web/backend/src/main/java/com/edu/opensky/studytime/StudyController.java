package com.edu.opensky.studytime;

import com.edu.opensky.user.UserService;
import com.edu.opensky.user.mentee.MenteeService;
import com.edu.opensky.user.mentor.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class StudyController {
    private final MenteeService menteeService;
    private final MentorService mentorService;
    private final UserService userService;


    @GetMapping("/study/info")
    public ResponseEntity<?> StudyInfo() {

//        User user = userService.getUserByToken(principal);
//        String role = user.getRole();
//        String id = "asdasd@naver.com";
//        String role = "멘토";
        /* 수정 필 */
        String id = "qqqq@naver.com";
        String role = "멘티";
        if (role.equals("멘티")) {
            return new ResponseEntity<>(menteeService.getStudyInfo(id),HttpStatus.OK);
        } else if (role.equals("멘토")) {
            return new ResponseEntity<>(mentorService.getMenteeList(id),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


}