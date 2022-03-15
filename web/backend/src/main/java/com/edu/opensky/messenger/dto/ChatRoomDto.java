package com.edu.opensky.messenger.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@NoArgsConstructor
public class ChatRoomDto {
    private String messengerId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();
    //WebSocketSession은 Spring에서 Websocket Connection이 맺어진 세션

    public static ChatRoomDto create(String name){
        ChatRoomDto room = new ChatRoomDto();

        room.messengerId = UUID.randomUUID().toString();
        room.name = name;
        return room;
    }
}
