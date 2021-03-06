package com.edu.opensky.messenger.chatRoomJoin;

import com.edu.opensky.messenger.chatRoom.ChatRoom;
import com.edu.opensky.messenger.chatRoom.ChatRoomRepository;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserRepository;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChatRoomJoinService {
    private final ChatRoomJoinRepository chatRoomJoinRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    @Transactional(readOnly = true)
    public List<ChatRoomJoin> findByUser(Optional<User> user) {
        return chatRoomJoinRepository.findByUser(user);
    }

    @Transactional(readOnly = true)
    public List<ChatRoomJoin> findByUser_Email(String id) {
        return chatRoomJoinRepository.findByUser_Email(id);
    }

    @Transactional(readOnly = true)
    public Long check(String user1,String user2){
        Optional<User> userFirst = userRepository.findByEmail(user1);
        List<ChatRoomJoin> listFirst = chatRoomJoinRepository.findByUser(userFirst);
        Set<ChatRoom> setFirst = new HashSet<>();
        for(ChatRoomJoin chatRoomJoin : listFirst){
            setFirst.add(chatRoomJoin.getChatRoom());
        }
        Optional<User> userSecond = userRepository.findByEmail(user2);
        List<ChatRoomJoin> listSecond = chatRoomJoinRepository.findByUser(userSecond);
        for(ChatRoomJoin chatRoomJoin : listSecond){
            if(setFirst.contains(chatRoomJoin.getChatRoom())){
                return chatRoomJoin.getChatRoom().getId();
            }
        }
        return 0L;
    }
    @Transactional
    public Long newRoom(String user1, String user2) {
        Long ret = check(user1,user2);
        if(ret != 0){
            //?????? ???????????? ????????? ?????? ??? ?????? ??????
            return ret;
        }
        ChatRoom chatRoom = new ChatRoom();
        ChatRoom newChatRoom = chatRoomRepository.save(chatRoom);
        if(user1.equals(user2)){
            //??? ???????????? ????????? ????????? ??????
            createRoom(user1,newChatRoom);
        }
        else{
            //?????? ??? ??????
            createRoom(user1,newChatRoom);
            createRoom(user2,newChatRoom);
        }
        return newChatRoom.getId();
    }
    @Transactional
    public void createRoom(String user, ChatRoom chatRoom){
        ChatRoomJoin chatRoomJoin = new ChatRoomJoin(userRepository.findByEmail(user).get(),chatRoom);
        chatRoomJoinRepository.save(chatRoomJoin);
    }
    @Transactional(readOnly = true)
    public List<ChatRoomJoin> findByChatRoom(ChatRoom chatRoom) {
        return chatRoomJoinRepository.findByChatRoom(chatRoom);
    }
    @Transactional
    public void delete(ChatRoomJoin chatRoomJoin) {
        chatRoomJoinRepository.delete(chatRoomJoin);
    }

    public String findAnotherUser(ChatRoom chatRoom, String name) {
        List<ChatRoomJoin> chatRoomJoins = findByChatRoom(chatRoom);
        for(ChatRoomJoin chatRoomJoin : chatRoomJoins){
            if(!name.equals(chatRoomJoin.getUser().getName())){
                return chatRoomJoin.getUser().getName();
            }
        }
        return name;
    }
}