package com.edu.opensky.user.mentee;

import com.edu.opensky.user.UserRepository;
import com.edu.opensky.user.mentee.dto.MenteeSaveRequestDto;
import com.edu.opensky.studytime.dto.studyInfoResponseDto;
import com.edu.opensky.user.admin.dto.AdminMenteeRequestDto;
import com.edu.opensky.user.mentor.Mentor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MenteeService {
    private final MenteeRepository menteeRepository;

    private final UserRepository userRepository;

    private final MenteeRepository mentorRepository;

    /* 회원가입 */
    @Transactional
    public String save(MenteeSaveRequestDto requestDto) {
        return menteeRepository.save(requestDto.toEntity()).getMtrId();
    }

    @Transactional(readOnly = true)
    public studyInfoResponseDto getStudyInfo(String id){
        Optional<Mentee> mentor = mentorRepository.findByMteId(id);
        Mentee mentee = menteeRepository.findByMteId(id)
                .orElseThrow(() -> new
                        IllegalArgumentException("존재하는 아이디가 없습니다."));

        if(mentor.isPresent()){
            return studyInfoResponseDto.builder()
                    .name(mentee.getName())
                    .exp(mentee.getExp())
                    .level(mentee.getLevel())
                    .mtrId(mentor.get().getMtrId())
                    .build();
        }else{
            return studyInfoResponseDto.builder()
                    .name(mentee.getName())
                    .exp(mentee.getExp())
                    .level(mentee.getLevel())
                    .build();
        }
    }

    public List<AdminMenteeRequestDto> getMenteeWithoutMentorList() {
        List<AdminMenteeRequestDto> adminMenteeRequestDtos =
                menteeRepository.findAll().stream()
                        .filter(mentee -> mentee.getMtrId() == null)
                        .map(mentee -> {
                            return AdminMenteeRequestDto.builder()
                                    .mteId(mentee.getMteId())
                                    .phone(userRepository.findByEmail(mentee.getMteId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저")).getPhone())
                                    .school(mentee.getSchool())
                                    .name(mentee.getName())
                                    .build();
                                }
                        ).collect(Collectors.toList());
        return adminMenteeRequestDtos;
    }

    public List<Mentee> getMenteeWithParent(String prtId){
        return menteeRepository.findByPrtId(prtId);
    }
}
