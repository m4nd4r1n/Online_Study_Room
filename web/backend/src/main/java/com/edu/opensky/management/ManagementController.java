package com.edu.opensky.management;

import com.edu.opensky.user.User;
import com.edu.opensky.user.UserRepository;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Time;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/management")
public class ManagementController {
    private final UserRepository userRepository;
    private final MenteeRepository menteeRepository;

    // 학생 정보 -> 학교, 이름, 전화번호 등.
    @GetMapping("/info/{stdId}")
    public HashMap<String, String> getStudentInfo(@PathVariable String stdId){
        HashMap<String, String> studentInfo = new HashMap<>();
        Optional<Mentee> mentee = menteeRepository.findByMteId(stdId);
        Optional<User> user = userRepository.findByEmail(stdId);
        if (mentee.isPresent() && user.isPresent()) {
            studentInfo.put("name",user.get().getName());
            studentInfo.put("school",mentee.get().getSchool());

            return studentInfo;
        }
        else{
            System.out.println("학생정보 없음");
            return null;
        }

    }

    // 학생의 학습정보
    @GetMapping("/studyTime")
    public String getStudyTime(){
        return LocalDate.now().toString();
    }
}
