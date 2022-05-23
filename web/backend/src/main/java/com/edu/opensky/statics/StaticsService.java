package com.edu.opensky.statics;

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

    public List<? extends Object> findWeekStatics(String ptrId, String year, String month, String day){
        String str=year+"-"+month+"-"+day+" 00:00:00.000";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
        System.out.println(dateTime);

        return staticsRepository.findByWeekStudyTime(ptrId,dateTime);
    }

    public List<Integer> getWeekStatics(String userId, String year, String month, String day){
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

        List<Integer> result = new ArrayList<>();
        for(int i = 0; i < 7; i++){
            localDate = localDate.plusDays(i);

            Integer studyTime = staticsRepository.findSecondsByWeekStudyTime(userId, localDate);
            Integer planTime = staticsRepository.findSecondsByWeekPlanTime(userId, localDate);
            if(planTime.equals(0)) {
                result.add(0);
            }else {
                result.add(studyTime / planTime);
            }

        }
        return result;

    }
    public LocalDate getMondayOfWeek(LocalDate localDate){
        return localDate.minusDays(localDate.getDayOfWeek().getValue()-1);
    }




}
