package com.edu.opensky.messenger.chatRoom;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDto {
    // 채팅방 번호
    private Long id;
    // 마지막 작성자
    private String writer;

    // 마지막 내용
    private String lastMessage;

    // 마지막 대화날짜 시간
    private LocalDateTime dateTime;

    @Builder
    public ChatRoomDto(Long roomId, String message, String anotherUser, LocalDateTime dateTime) {
        this.id = roomId;
        this.lastMessage = message;
        this.writer = anotherUser;
        this.dateTime = dateTime;
    }
}