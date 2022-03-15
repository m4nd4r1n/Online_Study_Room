package com.edu.opensky.attendance;

import com.edu.opensky.attendance.dto.AttendanceRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
public class AttendanceController {

    private final AttendanceService attendanceService;

    // 학생의 출석기록
    @PostMapping("/attendance")
    public List<LocalDate> attendList(@RequestBody AttendanceRequestDto requestDto){

        return attendanceService.attendanceList(requestDto.getUserID());
    }
}
