package com.edu.opensky.service;

import com.edu.opensky.domain.Attendance;
import com.edu.opensky.domain.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.LocalDate.now;
import static java.util.Optional.*;

@RequiredArgsConstructor
@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;

    // 학생의 이번 달의 출석일자 리스트 반환
    public List<LocalDate> attendanceList(String stdId){
        LocalDate date = now();
        List<Attendance> attendance = attendanceRepository.findByStdId(stdId);
        List<LocalDate> atdcdate = new ArrayList();
        for (Attendance atdc : attendance){
            if (atdc.getDate().getMonth().equals(date.getMonth())){
                atdcdate.add(atdc.getDate());
            }

        }
        return atdcdate;
    }
}
