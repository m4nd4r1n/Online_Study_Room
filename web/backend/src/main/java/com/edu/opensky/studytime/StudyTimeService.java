package com.edu.opensky.studytime;

import com.edu.opensky.image.ImageRepository;
import com.edu.opensky.studytime.dto.levelRankingListInterface;
import com.edu.opensky.user.User;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class StudyTimeService {
    private final StudyTimeRepository studyTimeRepository;
    private final MenteeRepository menteeRepository;
    private final ImageRepository imageRepository;

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

    public boolean detectNoStudying(User user){
        Optional<Mentee> mentee = menteeRepository.findByMteId(user.getEmail());

        if(mentee.isPresent()){
            mentee.get().getMteId();
            List<StudyTime> studyTimes = studyTimeRepository.findByMenteeAndEndTimeIsNullOrderByStartTimeDesc(mentee.get());
            // 10분 미인정시 동작 -> 10분 전으로 마무리
            // 시작한지 10분이 안지난 경우
            if(studyTimes.get(0).getStartTime().isBefore(LocalDateTime.now().minusMinutes(10))) {
                studyTimes.get(0).finishStudy(LocalDateTime.now().minusMinutes(10));
            }
            else{
                studyTimes.get(0).finishStudy(studyTimes.get(0).getStartTime());
            }
            studyTimeRepository.save(studyTimes.get(0));
            studyTimeRepository.save(StudyTime.builder().startTime(LocalDateTime.now()).endTime(null).mentee(mentee.get()).build());
            return true;
        }

        return false;
    }

    public boolean acceptStudying(String userId, String time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        LocalDateTime localDateTime = LocalDateTime.parse(time,formatter);
        Optional<Mentee> mentee = menteeRepository.findByMteId(userId);
        if(mentee.isPresent()){
            // 시간이 인정된 경우 time 기준으로 startTime= time-10분 , endtime = time
            studyTimeRepository.save(StudyTime.builder().endTime(localDateTime).startTime(localDateTime.minusMinutes(10)).mentee(mentee.get()).build());

            return true;
        }
        return false;

    }
}
