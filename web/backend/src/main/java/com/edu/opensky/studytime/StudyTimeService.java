package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.levelRankingListInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class StudyTimeService {
    private final StudyTimeRepository studyTimeRepository;

    public List<levelRankingListInterface> getRankingOfLevel(PageRequest pageRequest){

        return studyTimeRepository.findByRankingOfLevel(pageRequest).getContent();
    }

    public List<? extends Object> getRankingOfTime(String time, PageRequest pageRequest) {

        if(time.equals("week")){
            return studyTimeRepository.findByRankingOfTimeForWeek(LocalDate.now(),pageRequest).getContent();

        }
        else if(time.equals("month")) {
            return studyTimeRepository.findByRankingOfTimeForMonth(LocalDate.now(),pageRequest).getContent();
        }
        // default 일간
        else{
            return studyTimeRepository.findByRankingOfTimeForDay(LocalDate.now(),pageRequest).getContent();
        }
    }

    // 오늘 공부한 사람 수
    public Integer getNumOfTodayStudying(){
        return studyTimeRepository.countByStartTime(LocalDate.now());
    }

    // 지금 공부하는 사람 수 -> endTime == null
    public Integer getNumOfNowStudying(){
        return studyTimeRepository.countByStartTimeAndEndTimeIsNull(LocalDate.now());
    }

    public Integer getMyDailyRanking(String id){
        return studyTimeRepository.myRankingOfDay(LocalDate.now(),id);
    }
    public Integer getMyWeeklyRanking(String id){
        return studyTimeRepository.myRankingOfWeek(LocalDate.now(),id);

    }
    public Integer getMyMonthlyRanking(String id){
        return studyTimeRepository.myRankingOfMonth(LocalDate.now(),id);

    }
    public Integer getMyLevelRanking(String id){
        return studyTimeRepository.MyRankingOfLevel(id);
    }
}
