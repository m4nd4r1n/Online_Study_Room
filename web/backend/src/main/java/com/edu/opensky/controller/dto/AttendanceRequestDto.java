package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.User;
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
