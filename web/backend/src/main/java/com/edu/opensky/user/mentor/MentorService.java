package com.edu.opensky.user.mentor;

import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import com.edu.opensky.user.mentor.dto.MentorSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MentorService {

    private final MentorRepository mentorRepository;
    private final MenteeRepository menteeRepository;

    /* 회원가입 */
    @Transactional
    public String save(MentorSaveRequestDto requestDto) {
        return mentorRepository.save(requestDto.toEntity()).getMtrId();
    }

    /* 멘티 리스트 불러오기 */
    @Transactional
    public List<String> getMenteeList(String id) {
        List<Mentee> menteeList = menteeRepository.findByMtrId(id);
        return menteeRepository.findByMtrId(id).stream()
                .map(m->m.getMteId()).collect(Collectors.toList());
    }
}
