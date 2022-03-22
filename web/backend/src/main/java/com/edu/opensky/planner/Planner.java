package com.edu.opensky.planner;


import com.edu.opensky.user.mentee.Mentee;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@Entity
@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
public class Planner {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long plannerId;
;
    private String subject;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mte_id")
    private Mentee mentee;

    @Builder
    public Planner(Mentee mentee, String subject, LocalDate date, LocalTime startTime, LocalTime endTime) {
        this.mentee = mentee;
        this.subject = subject;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;

    }

    public void update(Mentee mentee, String subject,LocalDate date ,LocalTime startTime, LocalTime endTime) {
        this.mentee = mentee;
        this.subject = subject;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;


    }
}
