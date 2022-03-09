package com.edu.opensky.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
public class StudyTime {
    @Id
    private Long id;

    private String stdId;

    private LocalDate startTime;

    private LocalDate endTime;

    @Builder
    public StudyTime(Long id, String stdId, LocalDate startTime, LocalDate endtime){
        this.id = id;
        this.stdId = stdId;
        this.startTime = startTime;
        this.endTime = endtime;

    }

}
