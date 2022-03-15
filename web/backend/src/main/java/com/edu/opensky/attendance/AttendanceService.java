package com.edu.opensky.attendance;

import com.edu.opensky.attendance.Attendance;
import com.edu.opensky.attendance.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.time.LocalDate.now;

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
