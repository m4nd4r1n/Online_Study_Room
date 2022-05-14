package com.edu.opensky.user.mentee;

import com.edu.opensky.user.mentee.dto.MenteeSaveRequestDto;
import com.edu.opensky.user.mentee.dto.studyInfoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MenteeService {
    private final MenteeRepository menteeRepository;

    /* 회원가입 */
    @Transactional
    public String save(MenteeSaveRequestDto requestDto) {
        return menteeRepository.save(requestDto.toEntity()).getMtrId();
    }

    @Transactional(readOnly = true)
    public studyInfoResponseDto getStudyInfo(String id){
        Mentee mentee = menteeRepository.findByMteId(id)
                .orElseThrow(() -> new
                        IllegalArgumentException("존재하는 아이디가 없습니다."));

        return studyInfoResponseDto.builder()
                .name(mentee.getName())
                .exp(mentee.getExp())
                .level(mentee.getLevel())
                .build();
    }
}
