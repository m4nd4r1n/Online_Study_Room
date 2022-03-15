package com.edu.opensky.user.mentor;

import com.edu.opensky.user.mentor.dto.MentorSaveRequestDto;
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
