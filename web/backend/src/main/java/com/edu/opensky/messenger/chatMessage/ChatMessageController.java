package com.edu.opensky.messenger.chatMessage;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageService chatMessageService;
    @MessageMapping("/stomp/send")
    public void sendMsg(ChatMessageDto message) {
        String receiver = message.getReceiver();
        simpMessagingTemplate.convertAndSend("/sub/" + receiver,message);

        chatMessageService.save(message);
    }

}
