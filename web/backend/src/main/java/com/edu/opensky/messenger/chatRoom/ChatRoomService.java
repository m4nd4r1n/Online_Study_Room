package com.edu.opensky.messenger.chatRoom;

import com.edu.opensky.messenger.chatMessage.ChatMessage;
import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoin;
import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJoinService chatRoomJoinService;


    @Transactional(readOnly = true)
    public Optional<ChatRoom> findById(Long id) {
        return chatRoomRepository.findById(id);
    }

    @Transactional
    // 채팅방 마지막대화날짜 업데이트
    public void lastDateUpdate(String sender, String receiver){
        Long roomId = chatRoomJoinService.check(sender,receiver);
        Optional<ChatRoom> chatRoom= chatRoomRepository.findById(roomId);
        chatRoom.ifPresent(c -> {
            c.setLastDateTime(LocalDateTime.now());
            chatRoomRepository.save(chatRoom.get());

        });
    }
    // 채팅방별 마지막 메세지
    @Transactional(readOnly = true)
    public String findLastMessage(ChatRoom chatRoom) {
        if (chatRoom.getChatMessages().size() != 0) {
            Collections.sort(chatRoom.getChatMessages(), new Comparator<ChatMessage>() {
                @Override
                public int compare(ChatMessage o1, ChatMessage o2) {
                    if (o1.getDateTime().isAfter(o2.getDateTime())) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
            return chatRoom.getChatMessages().get(0).getMessage();


        }
        else{
            return "";
        }
    }
    public List<ChatRoomDto> chatRoomList(String sender) {
        List<ChatRoomJoin> chatRoomJoins = chatRoomJoinService.findByUser_Email(sender);
        List<ChatRoomDto> chatRoomInfos = new ArrayList<>();

        for (ChatRoomJoin c : chatRoomJoins) {
            chatRoomInfos.add(ChatRoomDto.builder()
                    .roomId(c.getChatRoom().getId())
                    .message(findLastMessage(c.getChatRoom()))
                    .anotherUser(chatRoomJoinService.findAnotherUser(c.getChatRoom(), c.getUser().getName()))
                    .dateTime(c.getChatRoom().getLastDateTime())
                    .build());
        }

        return chatRoomInfos;
    }

}
