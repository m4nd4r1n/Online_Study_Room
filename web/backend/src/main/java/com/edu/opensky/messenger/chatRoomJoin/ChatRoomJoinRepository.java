package com.edu.opensky.messenger.chatRoomJoin;

import com.edu.opensky.messenger.chatRoom.ChatRoom;
import com.edu.opensky.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomJoinRepository extends JpaRepository<ChatRoomJoin,Long> {

    List<ChatRoomJoin> findByUser(Optional<User> user);

    List<ChatRoomJoin> findByUser_Email(String id);

    List<ChatRoomJoin> findByChatRoom(ChatRoom chatRoom);

}
