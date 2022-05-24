package com.edu.opensky.management;


import com.edu.opensky.studytime.StudyTimeService;
import com.edu.opensky.user.mentor.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ManagementController {
    private final MentorService mentorService;
    private final StudyTimeService studyTimeService;

    @GetMapping("/management/info")
    public ResponseEntity getStudentInfo(@RequestParam String userId){
        if(userId.isEmpty() || userId.equals(null)){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(mentorService.getMenteeInfo(userId));
    }

    // 수정 중 인식시간은 스킵??
    @GetMapping("/management/studyTime")
    public ResponseEntity getStudyTime(@RequestParam String userId){
        if(userId.isEmpty() || userId.equals(null)){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    // 수정 중
    @PatchMapping("/management/studyTime")
    public ResponseEntity acceptStudyTime(@RequestParam String userId,
                                          @RequestParam String time){
        if(userId.isEmpty() || userId.equals(null)){
            return ResponseEntity.badRequest().build();
        }
        if(time.isEmpty() || time.equals(null)){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(mentorService.getMenteeInfo(userId));
    }
}
