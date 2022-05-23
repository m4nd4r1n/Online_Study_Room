package com.edu.opensky.planner.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PlannerAddDto {
    private String subject;

    private String date;
    private String startTime;
    private String endTime;

    private String userId;

    @Builder
    public PlannerAddDto(
            String subject, String date, String startTime, String endTime, String userId)
    {
        this.subject = subject;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.userId = userId;
    }
}
