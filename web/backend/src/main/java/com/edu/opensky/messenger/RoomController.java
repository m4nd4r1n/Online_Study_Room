package com.edu.opensky.messenger;

import com.edu.opensky.messenger.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api")
@Log4j2
public class RoomController {

    private final ChatRoomRepository chatRoomRepository;

    //채팅방 목록 조회
    @GetMapping(value = "/messenger")
    public List<ChatRoomDto> rooms(){

        log.info("# Print Chat Room List ");
        return chatRoomRepository.findAllRooms();
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
        String name = (String) Objects.requireNonNull(jsonObj).get("name");
        log.info("# Create Chat Room , name: " + name);
        return chatRoomRepository.createChatRoomDto(name).getMessengerId();
    }

    //채팅방 조회
    @GetMapping("/messenger/{messengerId}")
    public String getRoom(@PathVariable("messengerId") String messengerId){

        log.info("# get Chat Room, roomID : " + messengerId);

        return chatRoomRepository.findRoomById(messengerId).getName();
    }


}
