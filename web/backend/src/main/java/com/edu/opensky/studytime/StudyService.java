package com.edu.opensky.studytime;

import com.edu.opensky.user.User;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.time.LocalDateTime.now;

@RequiredArgsConstructor
@Service
public class StudyService {
    private final MenteeRepository menteeRepository;
    private final StudyTimeRepository studyTimeRepository;


    public boolean changeStudyingState(User user){

        Optional<Mentee> mentee = menteeRepository.findByMteId(user.getEmail());
        if (mentee.isPresent()){
            if(mentee.get().getState().equals("온라인")) {
                mentee.get().setState("학습 중");
                studyTimeRepository.save(StudyTime.builder()
                        .endTime(null)
                        .startTime(now())
                        .mentee(mentee.get())
                        .build());
            } else if (mentee.get().getState().equals("학습 중")) {
                mentee.get().setState("온라인");
                List<StudyTime> studyTimeList = studyTimeRepository.findByMenteeAndEndTimeIsNullOrderByStartTimeDesc(mentee.get());
                if(!studyTimeList.isEmpty()){
                    studyTimeList.get(0).finishStudy(now());
                    studyTimeRepository.save(studyTimeList.get(0));
                }


            }
            menteeRepository.save(mentee.get());
            return true;
        }
        return false;
    }
}
