package com.edu.opensky.attendance;


import com.edu.opensky.user.mentee.Mentee;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long attendanceId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "mteId")
    private Mentee mentee;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Builder
    public Attendance(Mentee mentee, LocalDate date){
        this.mentee = mentee;
        this.date = date;

    }
    public Attendance toEntity(){
        return Attendance.builder()
                .mentee(mentee)
                .date(date)
                .build();
    }

}
