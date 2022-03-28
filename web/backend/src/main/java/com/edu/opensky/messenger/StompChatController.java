package com.edu.opensky.messenger;

import com.edu.opensky.messenger.dto.ChatMessageDto;
import com.edu.opensky.messenger.dto.StudyMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Log4j2
public class StompChatController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    //"/pub/chat/message"
    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDto message){
        log.info("# receive message : " + message.getMessage());
        template.convertAndSend("/sub/chat/room/" + message.getMessengerId(), message);
    }

    //"/pub/study/message"
    @MessageMapping(value = "/study/message")
    public void message(StudyMessageDto message){
        log.info("# receive message : " + message.getType());
        template.convertAndSend("/sub/study/room/" + message.getUserId(), message);
    }

}