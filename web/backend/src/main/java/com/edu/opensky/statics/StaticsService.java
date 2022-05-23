package com.edu.opensky.statics;

import com.edu.opensky.planner.Planner;
import com.edu.opensky.planner.PlannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class StaticsService {

    private final StaticsRepository staticsRepository;
    private final PlannerRepository plannerRepository;

    public List<? extends Object> findWeekStatics(String ptrId, String year, String month, String day){
        String str=year+"-"+month+"-"+day+" 00:00:00.000";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
        System.out.println(dateTime);

        return staticsRepository.findByWeekStudyTime(ptrId,dateTime);
    }

    public List<WeekStudyTimeResponseDto> getWeekStatics(String userId, String year, String month, String day){
        if(month.length() == 1){
            month = '0'+month;
        }
        if (day.length() == 1){
            day = '0' + day;
        }

        // 월요일 찾기
        LocalDate localDate = getMondayOfWeek(LocalDate.of(
                Integer.parseInt(year),
                Integer.parseInt(month),
                Integer.parseInt(day)));

        List<WeekStudyTimeResponseDto> result = new ArrayList<>();
        localDate = localDate.minusDays(2);
        for(int i = -1; i < 6; i++){
            localDate = localDate.plusDays(1);

            Integer studyTime = staticsRepository.findSecondsByStudyTime(userId, localDate);
            Integer planTime = staticsRepository.findSecondsByPlanTime(userId, localDate);
            result.add(WeekStudyTimeResponseDto.builder()
                    .name(localDate.getDayOfWeek().toString())
                    .planTime(planTime)
                    .studyTime(studyTime)
                    .build());

        }
        return result;

    }
    public LocalDate getMondayOfWeek(LocalDate localDate){
        return localDate.minusDays(localDate.getDayOfWeek().getValue()-1);
    }


}
