package com.edu.opensky.user.mentor;

import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoinRepository;
import com.edu.opensky.messenger.chatRoomJoin.ChatRoomJoinService;
import com.edu.opensky.user.UserRepository;
import com.edu.opensky.user.admin.dto.AdminMenteeRequestDto;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import com.edu.opensky.user.mentor.dto.MenteeListDto;
import com.edu.opensky.user.mentor.dto.MentorListDto;
import com.edu.opensky.user.mentor.dto.MentorSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MentorService {

    private final MentorRepository mentorRepository;
    private final MenteeRepository menteeRepository;
    private final UserRepository userRepository;
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

    public List<MentorListDto> getMentorList() {
        List<MentorListDto> mentorListDtoList = mentorRepository.findAll().stream().map(m->{
            return MentorListDto.builder()
                    .mtrId(m.getMtrId())
                    .name(m.getName())
                    .phone(userRepository.findByEmail(m.getMtrId()).orElseThrow(()-> new IllegalArgumentException("해당 유저가 존재하지 않습니다.")).getPhone())
                    .build();
        }).collect(Collectors.toList());
        return mentorListDtoList;
    }

    public List<AdminMenteeRequestDto> getMenteeWithMentorList(String mtrId) {
        List<AdminMenteeRequestDto> adminMenteeRequestDtos =
                menteeRepository.findByMtrId(mtrId).stream().map(m->
                        AdminMenteeRequestDto.builder()
                                .mteId(m.getMteId())
                                .phone(userRepository.findByEmail(m.getMteId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저")).getPhone())
                                .name(m.getName())
                                .school(m.getSchool())
                                .build()).collect(Collectors.toList());
        return adminMenteeRequestDtos;
    }
}
