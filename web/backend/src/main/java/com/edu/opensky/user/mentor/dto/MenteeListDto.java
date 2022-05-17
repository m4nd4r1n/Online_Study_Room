package com.edu.opensky.user.mentor.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenteeListDto {
    private String id;
    private String school;
    private String name;
    private String state;

    private Long messengerId;

    @Builder
    public MenteeListDto(String id, String school, String name, String state, Long messengerId){
        this.id = id;
        this.school = school;
        this.name = name;
        this.state = state;
        this.messengerId = messengerId;
    }

}
