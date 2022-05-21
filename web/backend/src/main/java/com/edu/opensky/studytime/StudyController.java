package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.mentorNameAndChildResponseDto;
import com.edu.opensky.studytime.dto.parentNameAndChildResponseDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import com.edu.opensky.user.mentee.MenteeService;
import com.edu.opensky.user.mentor.MentorService;
import com.edu.opensky.user.parent.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class StudyController {
    private final MenteeService menteeService;
    private final MentorService mentorService;
    private final ParentService parentService;
    private final UserService userService;


    @GetMapping("/study/info")
    public ResponseEntity StudyInfo(
            @CookieValue(value="Authorization") String token) {

        User user = userService.getUserByToken(token);

        String id = user.getEmail();
        String role = user.getRole();
        if (role.equals("멘티")) {
            return ResponseEntity.ok(menteeService.getStudyInfo(id));
        } else if (role.equals("멘토")) {
            mentorNameAndChildResponseDto responseDto = mentorService.getMyNameAndMenteeList(id);
            if (responseDto.getName() == null){
                return ResponseEntity.badRequest().build();
            }
            else{
                return ResponseEntity.ok(responseDto);
            }
        } else if (role.equals("학부모")){
            parentNameAndChildResponseDto responseDto =parentService.getMyNameAndChildList(id);
            if (responseDto.getName() == null){
                return ResponseEntity.badRequest().build();
            }
            else{
                return ResponseEntity.ok(responseDto);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


}