package com.edu.opensky.messenger.chatMessage;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageDto {
    private Long ChatRoomId;
    private String receiver;
    private String sender;
    private String message;
    private String dateTime = LocalDateTime.now().toString();

    @Builder
    public ChatMessageDto(Long ChatRoomId, String receiver, String sender, String message, String dateTime){
        this.ChatRoomId = ChatRoomId;
        this.receiver = receiver;
        this.sender = sender;
        this.message = message;
        this.dateTime = dateTime;
    }
}