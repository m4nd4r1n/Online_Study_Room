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
}
