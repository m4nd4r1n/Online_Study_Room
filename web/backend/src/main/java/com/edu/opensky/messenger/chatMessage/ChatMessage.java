package com.edu.opensky.messenger.chatMessage;

import com.edu.opensky.messenger.chatRoom.ChatRoom;
import com.edu.opensky.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
public class ChatMessage {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "message_id")
    private Long id;

    // 내용
    @Column(nullable = false)
    private String message;

    // 메세지 날짜
    @Column(nullable = false)
    private LocalDateTime dateTime;

    // 보내는 사람
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private ChatRoom chatRoom;

    @Builder
    public ChatMessage(String message, ChatRoom chatRoom, User user){
        this.message = message;
        this.user =user;
        this.chatRoom = chatRoom;
        this.dateTime = LocalDateTime.now();
    }
}
