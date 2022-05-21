package com.edu.opensky.user.parent;

import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoinService;
import com.edu.opensky.studytime.dto.parentNameAndChildResponseDto;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeService;
import com.edu.opensky.user.mentor.dto.MenteeListDto;
import com.edu.opensky.user.parent.dto.ParentSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ParentService {
    private final ParentRepository parentRepository;
    private final MenteeService menteeService;
    private final ChatRoomJoinService chatRoomJoinService;

    /* 회원가입 */
    @Transactional
    public String save(ParentSaveRequestDto requestDto) {
        System.out.println("requestDto.toEntity() = " + requestDto.toEntity());
        return parentRepository.save(requestDto.toEntity()).getPrtId();
    }

    public parentNameAndChildResponseDto getMyNameAndChildList(String prtId) {
        Optional<Parent> parent =  parentRepository.findByPrtId(prtId);
        List<MenteeListDto> menteeListDtoList = new ArrayList<>();
        if (parent.isPresent()){
            List<Mentee> menteeList = menteeService.getMenteeWithParent(prtId);
            for (Mentee m : menteeList) {
                menteeListDtoList.add(
                        MenteeListDto.builder()
                                .id(m.getMteId())
                                .school(m.getSchool())
                                .name(m.getName())
                                .state(m.getState())
                                .messengerId(chatRoomJoinService.check(prtId, m.getMteId()))
                                .build());
            }
            return parentNameAndChildResponseDto.builder()
                    .name(parent.get().getName())
                    .menteeList(menteeListDtoList)
                    .build();
        }
        else
            return new parentNameAndChildResponseDto();
    }
}
