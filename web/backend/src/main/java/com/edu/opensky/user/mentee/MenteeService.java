package com.edu.opensky.user.mentee;

import com.edu.opensky.user.mentee.dto.MenteeSaveRequestDto;
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
}
