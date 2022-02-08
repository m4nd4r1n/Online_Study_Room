package com.edu.opensky.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@NoArgsConstructor
@Entity
@JsonFormat(timezone = "Asia/Seoul")
public class Attendance {

    @Id
    private Long attendanceId;

    private String stdId;
    private Date date;

    @Builder
    public Attendance(String stdId, Date date){
        this.stdId = stdId;
        this.date = date;

    }

}
