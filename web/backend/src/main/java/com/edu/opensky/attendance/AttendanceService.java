package com.edu.opensky.attendance;

import com.edu.opensky.attendance.Attendance;
import com.edu.opensky.attendance.AttendanceRepository;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.LocalDate.now;

@RequiredArgsConstructor
@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final MenteeRepository menteeRepository;

    // 학생의 이번 달의 출석일자 리스트 반환
    public List<LocalDate> attendanceList(String stdId) {
        LocalDate date = now();
        List<LocalDate> atdcdate = new ArrayList();
        Optional<Mentee> mentee = menteeRepository.findByMteId(stdId);

        mentee.ifPresent(selectMentee -> {
            List<Attendance> attendance = attendanceRepository.findByMentee(selectMentee);

            for (Attendance atdc : attendance) {
                if (atdc.getDate().getMonth().equals(date.getMonth())) {
                    atdcdate.add(atdc.getDate());
                }

            }
        });

        return atdcdate;
    }
}
