package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.LevelRankingDto;
import com.edu.opensky.studytime.dto.TimeRankingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class StudyTimeService {
    private final StudyTimeRepository studyTimeRepository;

    public Page<LevelRankingDto> getRankingOfLevel(PageRequest pageRequest){
        return studyTimeRepository.findByRankingOfLevel(pageRequest);
    }

    public Page<TimeRankingDto> getRankingOfTime(String time, PageRequest pageRequest) {
        if(time.equals("week")){
            return studyTimeRepository.findByRankingOfTimeForWeek(pageRequest);

        }
        else if(time.equals("month")) {
            return studyTimeRepository.findByRankingOfTimeForMonth(pageRequest);
        }
        // default 일간
        else{
            return studyTimeRepository.findByRankingOfTimeForDay(pageRequest);
        }
    }
}
