package com.edu.opensky.studytime;

import com.edu.opensky.image.ImageService;
import com.edu.opensky.studytime.dto.mentorNameAndChildResponseDto;
import com.edu.opensky.studytime.dto.parentNameAndChildResponseDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import com.edu.opensky.user.mentee.MenteeRepository;
import com.edu.opensky.user.mentee.MenteeService;
import com.edu.opensky.user.mentor.MentorService;
import com.edu.opensky.user.parent.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class StudyController {
    private final MenteeService menteeService;
    private final MentorService mentorService;
    private final ParentService parentService;
    private final UserService userService;
    private final MenteeRepository menteeRepository;
    private final StudyService studyService;
    private final ImageService imageService;
    private final StudyTimeService studyTimeService;


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

        if(studyService.changeStudyingState(user)){
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }
    // 미인식 시간 업로드
    @PostMapping("/study/upload")
    public ResponseEntity uploadFrame(
            @CookieValue(value="Authorization") String token,
            @RequestPart("image") List<MultipartFile> files) throws IOException {

        User user = userService.getUserByToken(token);
        imageService.saveImage(user,files);
        if(!studyTimeService.detectNoStudying(user)){
            return ResponseEntity.badRequest().build();

        }

        return ResponseEntity.ok().build();
    }
}