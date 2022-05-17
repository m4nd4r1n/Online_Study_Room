package com.edu.opensky.user.mentor;

import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoinRepository;
import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoinService;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import com.edu.opensky.user.mentor.dto.MenteeListDto;
import com.edu.opensky.user.mentor.dto.MentorSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MentorService {

    private final MentorRepository mentorRepository;
    private final MenteeRepository menteeRepository;
    private final ChatRoomJoinRepository chatRoomJoinRepository;
    private final ChatRoomJoinService chatRoomJoinService;

    /* 회원가입 */
    @Transactional
    public String save(MentorSaveRequestDto requestDto) {
        return mentorRepository.save(requestDto.toEntity()).getMtrId();
    }

    /* 멘티 리스트 불러오기 */
    @Transactional
    public List<MenteeListDto>getMenteeList(String id) {
        Optional<Mentor> mentor = mentorRepository.findByMtrId(id);
        List<Mentee> menteeList = mentor.get().getMenteeList();
        List<MenteeListDto> menteeListDtoList = new ArrayList<>();
        for (Mentee m: menteeList) {
            menteeListDtoList.add(
                    MenteeListDto.builder()
                            .id(m.getMteId())
                            .school(m.getSchool())
                            .name(m.getName())
                            .state(m.getState())
                            .messengerId(chatRoomJoinService.check(id,m.getMteId()))
                            .build());
        }
//        List<Mentee> menteeList = menteeRepository.findByMtrId(id);
//        return menteeRepository.findByMtrId(id).stream()
//                .map(m->m.getMteId()).collect(Collectors.toList());
        return menteeListDtoList;
    }
}
