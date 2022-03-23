package com.edu.opensky.studytime;

import com.edu.opensky.user.mentee.Mentee;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class StudyTime {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mte_id")
    private Mentee mentee;

    private LocalDate date;
    private LocalTime startTime;

    private LocalTime endTime;

    @Builder
    public StudyTime(Mentee mentee,LocalDate date, LocalTime startTime, LocalTime endTime){
        this.mentee = mentee;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;

    }

}
