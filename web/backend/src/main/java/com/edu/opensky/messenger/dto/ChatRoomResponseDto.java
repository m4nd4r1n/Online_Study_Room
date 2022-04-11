package com.edu.opensky.messenger.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomResponseDto {

    // 채팅방 번호
    Long roomId;
    // 상대 이름
    String receiver;
    // 마지막 대화
    String lastDate;

    @Builder
    public ChatRoomResponseDto(Long roomId, String receiver, String lastDate){
        this.roomId = roomId;
        this.receiver = receiver;
        this.lastDate = lastDate;
    }
}
