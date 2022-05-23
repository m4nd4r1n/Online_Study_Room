package com.edu.opensky.statics;

import com.edu.opensky.planner.Planner;
import com.edu.opensky.planner.PlannerRepository;
import com.edu.opensky.studytime.StudyTime;
import com.edu.opensky.studytime.StudyTimeRepository;
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
    private final StudyTimeRepository studyTimeRepository;

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
                    .planTime(planTime/60)
                    .studyTime(studyTime/60)
                    .build());

        }
        return result;

    }
    public LocalDate getMondayOfWeek(LocalDate localDate){
        return localDate.minusDays(localDate.getDayOfWeek().getValue()-1);
    }


    public DateStudyTimeResponseDto getDateStatics(String userId, String year, String month, String day) {
        if(month.length() == 1){
            month = '0'+month;
        }
        if (day.length() == 1){
            day = '0' + day;
        }
        LocalDate localDate = getMondayOfWeek(LocalDate.of(
                Integer.parseInt(year),
                Integer.parseInt(month),
                Integer.parseInt(day)));

        List<Planner> planners = plannerRepository.findByDateEqualsAndAndMentee_MteId(localDate,userId);
        List<StudyTime> studyTimes = studyTimeRepository.findByDate(localDate,userId);
        Integer planTime = 0;
        Integer studyTime = 0;
        for (StudyTime s : studyTimes){
            studyTime += (s.getEndTime().getHour()-s.getStartTime().getHour())*60;
            studyTime += (s.getEndTime().getMinute()%10-s.getStartTime().getMinute()%10)*10;

        }
        
        for (Planner p : planners ){
            planTime += (p.getEndTime().getHour()-p.getStartTime().getHour())*60;
            planTime += (p.getEndTime().getMinute()%10 -p.getStartTime().getMinute()%10)*10;
        }


        return DateStudyTimeResponseDto.builder().planTime(planTime).studyTime(studyTime).build();
    }
}
