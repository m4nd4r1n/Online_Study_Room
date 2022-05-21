package com.edu.opensky.user.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Getter
@Builder
public class AdminMenteeRequestDto {

    private String mteId;
    private String name;
    private String school;
    private String phone;

}
