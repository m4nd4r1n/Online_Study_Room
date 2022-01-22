package com.edu.opensky.service;

import com.edu.opensky.controller.dto.MentorSaveRequestDto;
import com.edu.opensky.domain.repository.MentorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MentorService {

    private final MentorRepository mentorRepository;

    /* 회원가입 */
    @Transactional
    public String save(MentorSaveRequestDto requestDto) {
        return mentorRepository.save(requestDto.toEntity()).getMtrId();
    }


}
