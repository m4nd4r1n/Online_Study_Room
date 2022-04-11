package com.edu.opensky.messenger.chatMessage;

import com.edu.opensky.messenger.chatRoom.ChatRoomService;
import com.edu.opensky.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final ChatRoomService chatRoomService;

    @Transactional
    public void save(ChatMessageDto message) {
        ChatMessage chatMessage = new ChatMessage(message.getMessage(), chatRoomService.findById(message.getChatRoomId()).get()
                ,userRepository.findByEmail(message.getSender()).get());
        chatMessageRepository.save(chatMessage);
    }


}