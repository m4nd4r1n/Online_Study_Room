package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.mentorNameAndChildResponseDto;
import com.edu.opensky.studytime.dto.parentNameAndChildResponseDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import com.edu.opensky.user.mentee.MenteeService;
import com.edu.opensky.user.mentor.MentorService;
import com.edu.opensky.user.parent.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class StudyController {
    private final MenteeService menteeService;
    private final MentorService mentorService;
    private final ParentService parentService;
    private final UserService userService;
    private final MenteeRepository menteeRepository;


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

    @PostMapping("/study/state")
    public ResponseEntity StudyState(
            @CookieValue(value="Authorization") String token) {
        User user = userService.getUserByToken(token);
        Optional<Mentee> mentee = menteeRepository.findByMteId(user.getEmail());
        if (mentee.isPresent()){
            if(mentee.get().getState().equals("온라인")) {
                mentee.get().setState("학습 중");
            } else if (mentee.get().getState().equals("학습 중")) {
                mentee.get().setState("온라인");
            }
            menteeRepository.save(mentee.get());
            return ResponseEntity.ok().build();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}