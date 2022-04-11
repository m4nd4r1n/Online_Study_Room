package com.edu.opensky.messenger.chatRoomJoin;

import com.edu.opensky.messenger.chatRoom.ChatRoom;
import com.edu.opensky.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoomJoin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name =  "email", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private ChatRoom chatRoom;

    public ChatRoomJoin(User user , ChatRoom chatRoom){
        this.user=user;
        this.chatRoom=chatRoom;
    }
}
