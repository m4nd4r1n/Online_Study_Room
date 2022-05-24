package com.edu.opensky.management;


import com.edu.opensky.image.ImageService;
import com.edu.opensky.management.dto.ImageAndTimeResponseDto;
import com.edu.opensky.studytime.StudyTimeService;
import com.edu.opensky.user.mentor.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ManagementController {
    private final MentorService mentorService;
    private final StudyTimeService studyTimeService;
    private final ImageService imageService;

    @GetMapping("/management/info")
    public ResponseEntity getStudentInfo(@RequestParam String userId){
        if(userId.isEmpty() || userId.equals(null)){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(mentorService.getMenteeInfo(userId));
    }

    @GetMapping("/management/studyTime")
    public ResponseEntity getStudyTime(@RequestParam String userId){
        if(userId.isEmpty() || userId.equals(null)){
            return ResponseEntity.badRequest().build();
        }
        List<ImageAndTimeResponseDto> responseDtos = null;
        try {
            responseDtos = imageService.getImageAndTime(userId);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();

        }

        return ResponseEntity.ok(responseDtos);

    }

    // 학습 시간 인정 요청
    @PatchMapping("/management/studyTime")
    public ResponseEntity acceptStudyTime(@RequestParam String userId,
                                          @RequestParam String time){
        if(userId.isEmpty() || userId.equals(null)){
            return ResponseEntity.badRequest().build();
        }
        if(time.isEmpty() || time.equals(null)){
            return ResponseEntity.badRequest().build();
        }


        if(!studyTimeService.acceptStudying(userId,time)){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
