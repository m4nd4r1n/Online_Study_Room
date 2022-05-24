package com.edu.opensky.management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MentorMenteeResponseDto {

    private String mteId;
    private String name;
    private String school;
    private String phone;

}