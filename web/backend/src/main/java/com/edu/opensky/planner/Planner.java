package com.edu.opensky.planner;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Time;

@Getter
@NoArgsConstructor
@Entity
@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
public class Planner {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long plannerId;

    private String stdId;
    private String subject;
    private Time startTime;
    private Time endTime;

    @Builder
    public Planner(String stdId, String subject, Time startTime, Time endTime) {
        this.stdId = stdId;
        this.subject = subject;

        this.startTime = startTime;
        this.endTime = endTime;

    }

    public void update(String mteId, String subject, Time startTime, Time endTime) {
        this.stdId = mteId;
        this.subject = subject;
        this.startTime = startTime;
        this.endTime = endTime;


    }
}
