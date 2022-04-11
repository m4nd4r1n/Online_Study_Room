package com.edu.opensky.messenger.chatRoom;

import com.edu.opensky.messenger.chatMessage.ChatMessage;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoom {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "room_id")
    private Long id;


    private LocalDateTime lastDateTime = LocalDateTime.now();

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<ChatMessage> chatMessages = new ArrayList<>();


    public void setLastDateTime(LocalDateTime dateTime) {
        this.lastDateTime = dateTime;
    }
}
