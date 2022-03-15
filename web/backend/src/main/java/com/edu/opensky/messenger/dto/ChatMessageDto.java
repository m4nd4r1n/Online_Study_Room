package com.edu.opensky.messenger.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class ChatMessageDto {
    private String messengerId;
    private String writer;
    private String message;

    @Builder
    public ChatMessageDto(String messengerId, String writer, String message) {
        this.messengerId = messengerId;
        this.writer = writer;
        this.message = message;
    }
}
