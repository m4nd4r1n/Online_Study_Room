package com.edu.opensky.management;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Time;
import java.time.LocalDate;
import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/management")
public class ManagementController {

    // 학생 정보 -> 학교, 이름, 전화번호 등.
    @GetMapping("/info/{id}")
    public HashMap<String, String> getStudentInfo(@PathVariable String id){
        HashMap<String, String> studentInfo = new HashMap<>();

        return null;

    }

    // 학생의 학습정보
    @GetMapping("/studyTime")
    public String getStudyTime(){
        return LocalDate.now().toString();
    }
}
