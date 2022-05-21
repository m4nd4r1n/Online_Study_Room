package com.edu.opensky.studytime.dto;

import com.edu.opensky.user.mentor.dto.MenteeListDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor @AllArgsConstructor
@Getter
@Builder
public class parentNameAndChildResponseDto {
    private String name;
    private List<MenteeListDto> menteeList;
}
