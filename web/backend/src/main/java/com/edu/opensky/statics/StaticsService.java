package com.edu.opensky.statics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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





}
