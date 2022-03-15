package com.edu.opensky.studytime;

import com.edu.opensky.user.mentee.Mentee;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
public class StudyTime {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mte_id")
    private Mentee mentee;

    private LocalDate startTime;

    private LocalDate endTime;

    @Builder
    public StudyTime(Long id, Mentee mentee, LocalDate startTime, LocalDate endtime){
        this.id = id;
        this.mentee = mentee;
        this.startTime = startTime;
        this.endTime = endtime;

    }

}
