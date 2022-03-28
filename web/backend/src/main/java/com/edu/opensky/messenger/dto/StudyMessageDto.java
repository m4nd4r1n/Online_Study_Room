package com.edu.opensky.messenger.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class StudyMessageDto {
    private String userId;
    private String type;
    private Object ice;
    private Object offer;
    private Object answer;


    @Builder
    public StudyMessageDto(String messengerId, String writer, String message) {
        this.userId = userId;
        this.type = type;
        this.ice = ice;
        this.offer = offer;
        this.answer = answer;
    }
}
