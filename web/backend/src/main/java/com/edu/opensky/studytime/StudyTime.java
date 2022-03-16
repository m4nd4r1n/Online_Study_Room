package com.edu.opensky.studytime;

import com.edu.opensky.user.mentee.Mentee;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class StudyTime {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mte_id")
    private Mentee mentee;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Builder
    public StudyTime(Long id, Mentee mentee, LocalDateTime startTime, LocalDateTime endtime){
        this.id = id;
        this.mentee = mentee;
        this.startTime = startTime;
        this.endTime = endtime;

    }

}
