package com.edu.opensky.messenger;

import com.edu.opensky.messenger.chatMessage.ChatMessageDto;
import com.edu.opensky.messenger.chatMessage.ChatMessageService;
import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoinService;
import com.edu.opensky.messenger.chatRoom.ChatRoomRepository;
import com.edu.opensky.messenger.chatRoom.ChatRoomService;
import com.edu.opensky.messenger.dto.StudyMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Log4j2
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final ChatMessageService chatMessageService;
    private final ChatRoomJoinService chatRoomJoinService;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService chatRoomService;

    //"/pub/chat/message"
    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDto message){

        // 토큰 아이디
        String sender="sender";
        log.info("# receive message : " + message.getMessage());
        template.convertAndSend("/sub/chat/room/" + message.getChatRoomId(), message);
        chatMessageService.save(message);

        // 채팅방 마지막 대화날짜 업데이트
        chatRoomService.lastDateUpdate(sender, message.getReceiver());

    }

    //"/pub/study/message"
    @MessageMapping(value = "/study/message")
    public void message(StudyMessageDto message){
        log.info("# receive message : " + message.getType());
        template.convertAndSend("/sub/study/room/" + message.getUserId(), message);
    }

}