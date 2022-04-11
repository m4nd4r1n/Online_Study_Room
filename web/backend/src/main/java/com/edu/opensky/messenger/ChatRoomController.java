package com.edu.opensky.messenger;

import com.edu.opensky.messenger.chatMessage.ChatMessage;
import com.edu.opensky.messenger.chatMessage.ChatMessageDto;
import com.edu.opensky.messenger.chatMessage.ChatMessageService;
import com.edu.opensky.messenger.chatRoom.*;
import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoinService;
import com.edu.opensky.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api")
@Log4j2
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJoinService chatRoomJoinService;
    private final UserRepository userRepository;
    private final ChatMessageService chatMessageService;
    private final ChatRoomService chatRoomService;

    //채팅방 목록 조회
    @GetMapping(value = "/messenger")
    public List<ChatRoomDto> rooms(){
        // 토큰 아이디 수정예정
        String sender = "sender";
        log.info("# Print Chat Room List ");
        List<ChatRoomDto> chatRoomList = chatRoomService.chatRoomList(sender);

        return chatRoomList;
    }

    //채팅방 개설
    @PostMapping(value = "/room")
    public String create(@RequestBody String jsonStr){

        JSONParser parser = new JSONParser();
        Object obj = null;
        try {
            obj = parser.parse( jsonStr );
        } catch (ParseException e) {
            e.printStackTrace();
        }
        JSONObject jsonObj = (JSONObject) obj;
        log.info("# Create Chat Room");

        // 토큰의아이디
        String sender = "sender";

        // 상대방
        String receiver = (String) Objects.requireNonNull(jsonObj).get("receiver");

        Long charRoomId = chatRoomJoinService.newRoom(sender,receiver);
        
        //생성된 채팅방번호
        return charRoomId.toString();

    }

    //채팅방 조회
    @GetMapping("/messenger/messengerId{messengerId}")
    public List<ChatMessageDto> getRoom(@RequestParam String messengerId){

        log.info("# get Chat Room, roomID : " + messengerId);
        // 토큰 아이디의 name
        String senderName = "ewq";

        Optional<ChatRoom> room = chatRoomRepository.findById(Long.parseLong(messengerId));
        System.out.println(room);
        List<ChatMessageDto> messages = new ArrayList<>();
        room.ifPresent(r -> {
            String otherUser = chatRoomJoinService.findAnotherUser(r,senderName);
            for (ChatMessage c : r.getChatMessages()){
                if (c.getUser().getName().equals(senderName)) {
                    messages.add(ChatMessageDto.builder()
                            .ChatRoomId(r.getId())
                            .receiver(otherUser)
                            .sender(senderName)
                            .dateTime(c.getDateTime().toString())
                            .message(c.getMessage())
                            .build());
                }
                else{

                    messages.add(ChatMessageDto.builder()
                            .ChatRoomId(r.getId())
                            .receiver(senderName)
                            .sender(otherUser)
                            .dateTime(c.getDateTime().toString())
                            .message(c.getMessage())
                            .build());
                }
            }
        });
        return messages;
    }

    // 테스트용
    @PostMapping(value = "/chat/messageTest")
    public void message(){
        ChatMessageDto message = ChatMessageDto.builder()
                .message("im receiver")
                .ChatRoomId(1L)
                .sender("receiver")
                .receiver("sender")
                .build();
        log.info("# receive message : " + message.getMessage());
        chatMessageService.save(message);

        chatRoomService.lastDateUpdate("sender", message.getReceiver());
    }
}
