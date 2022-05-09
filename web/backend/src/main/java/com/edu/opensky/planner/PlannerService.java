package com.edu.opensky.planner;

import com.edu.opensky.planner.dto.PlannerAddDto;
import com.edu.opensky.user.mentee.Mentee;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class PlannerService {
    private final PlannerRepository plannerRepository;

    public void AddPlan(String id, PlannerAddDto plannerAddDto){

        String[] dateSplit = plannerAddDto.getDate().split("T");
        LocalDate date = LocalDate.parse(dateSplit[0]);
        LocalTime startTime = LocalTime.of(
                Integer.parseInt(plannerAddDto.getStartTime().substring(0,2)),
                Integer.parseInt(plannerAddDto.getStartTime().substring(3,5)),
                Integer.parseInt(plannerAddDto.getStartTime().substring(6,8)));
        LocalTime endTime = LocalTime.of(
                Integer.parseInt(plannerAddDto.getEndTime().substring(0,2)),
                Integer.parseInt(plannerAddDto.getEndTime().substring(3,5)),
                Integer.parseInt(plannerAddDto.getEndTime().substring(6,8)));

        plannerRepository.save(Planner.builder()
                .subject(plannerAddDto.getSubject())
                .mentee(Mentee.builder().mteId(id).build())
                .date(date)
                .startTime(startTime)
                .endTime(endTime)
                .build());

    }


    public List<Planner> getPlans(String year, String month, String day, String userId){
        LocalDate date = LocalDate.of(Integer.parseInt(year),Integer.parseInt(month),Integer.parseInt(day));

        return plannerRepository.findPlannersByDateAndMentee_MteId(
                date, userId);
    }

    public void removePlan(String subject, String year, String month, String day){

        LocalDate date = LocalDate.of(Integer.parseInt(year),Integer.parseInt(month),Integer.parseInt(day));
        plannerRepository.findBySubjectAndDate(subject,date).ifPresent(plannerRepository::delete);

    }
}
