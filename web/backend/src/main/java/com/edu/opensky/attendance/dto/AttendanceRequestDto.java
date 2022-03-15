package com.edu.opensky.attendance.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class AttendanceRequestDto {
    private String userID;


    public AttendanceRequestDto(String userID){
        this.userID = userID;

    }


}
